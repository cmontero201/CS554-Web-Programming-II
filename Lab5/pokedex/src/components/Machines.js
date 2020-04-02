import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import noImage from '../img/None.jpeg'
import Page from './Page'
import NotFound from './NotFound'

const Machines = (props) => {
    const [ machineData, setMachineData ] = useState(undefined);
    const [ pageData, setPageData ] = useState({});
    const [ getPage, setGetPage ] = useState(0);

    let currPage = null;
    let desc = null;
    let col = null;
    let img = null;
    let page = null;
    let details = {};
    let info = [];

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect( 
        () => {
            currPage = Number(props.match.params.page);
            
            async function fetchList() {
                try {
                    setGetPage(currPage);
                    
                    // Get currPage Machine Data
                    const { data } = await axios.get("https://pokeapi.co/api/v2/machine/?limit=20&offset=" + (currPage * 20).toString());

                    if (data.results) {
                        await data.results.map( async (machine) => {
                            let url = machine.url;
                            return await axios.get(url).then( async (indiv) => {
                                info.push(indiv.data);
                            });
                        });
                    };

                    await sleep(300);

                    info && info.map( (machine) => {
                        let x = machine.item.url
                        details[x] = null;
                    });
                    
                    let urls = Object.keys(details)

                    if (urls) {
                        urls.map( async (url) => {
                            return await axios.get(url).then( (info) => {
                                details[url] = info
                            });
                        });
                    };

                    await sleep(300);


                    setMachineData([info, details]);
                    setPageData( {count: data.count, next: data.next, prev: data.previous} );

                } catch (err) {
                    setMachineData(null);
                    console.log(err);
                };
            };

            fetchList();
        }, [ props.match.params.page ]
    );

    if (machineData && (getPage * 20 <= pageData.count)) {
        desc = (
            <p>
                Machines are the representation of items that teach moves to Pokémon. They vary from 
                version to version, so it is not certain that one specific TM or HM corresponds to a 
                single Machine.
            </p>
        )
        col = machineData[0] && machineData[0].map( (machine, index) => {
            let ind = machine
            let ind2 = machineData[1]

            if (ind2[ind.item.url] && ind2[ind.item.url].data.sprites.default) {
                img = <img alt = {ind.item.name + "Image"} src = {ind2[ind.item.url].data.sprites.default} />
            } else {
                img = <img className = 'notFound' alt = {ind.item.name + "Image"} src = {noImage} />
            }

            return (
                <Col className = 'pokeCol' key = {ind.id}>
                    <div className = 'pokeLink'>
                        <Link to = {`/machines/${ind.id}`}>
                            {img}
                            <br />
                            {ind.item.name}
                            <br />
                            <div className = 'sub'>
                                ({ind.version_group.name})
                            </div>
                        </Link>
                    </div>
                </Col>
            );
        });
    };

    // NotFound Component if no PokeData
    if (machineData === null || getPage > Math.floor(pageData.count / 20)) {
        return (
            <NotFound/>
        ); 
    };

    // Pagination Helper Function
    const pageNum = (bool) => {
        let page = 0
        if (bool) {
            page = getPage + 1;
        } else {
            page = getPage - 1;
        };
        setGetPage(page);
    };
        
    // Pagination Component
    if (getPage <= Math.floor(pageData.count / 20)) {
        page = <Page pageNum = {[pageNum, getPage, pageData.count, 'machines']} />
    } else {
        page = null
    };

    return (
        <Container>
            <br />
            <br />
            <Row>
                {desc}
            </Row>
            <Row className = 'page' sm = {3} md = {3} lg = {5}>
                {col} 
            </Row>
            <br />
            <Row className = 'page'> 
                {page}
            </Row>
        </Container>
    );
};

export default Machines;