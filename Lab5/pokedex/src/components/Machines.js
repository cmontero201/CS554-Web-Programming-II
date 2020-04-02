import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import noImage from '../img/None.jpeg'
import loading from '../img/loading.png'
import Page from './Page'
import NotFound from './NotFound'

const Machines = (props) => {
    const [ machineData, setMachineData ] = useState(undefined);
    const [ getPage, setGetPage ] = useState(0);

    let currPage = null;
    let desc = null;
    let col = null;
    let img = null;
    let page = null;
    let details = {};
    let info = [];

    useEffect( 
        () => {
            currPage = Number(props.match.params.page);
            
            async function fetchList() {
                try {                    
                    // Get currPage Machine Data
                    const { data } = await axios.get("https://pokeapi.co/api/v2/machine/?limit=15&offset=" + (currPage * 15).toString());

                    // Get details for each pokemon in Pokelist
                    let x = data.results.map( async (machine) => {
                        let url = machine.url;
                        return await axios.get(url).then( async (indiv) => {
                            info.push(indiv.data);
                        });
                    });

                    Promise.all(x).then( (res) => { 
                        console.log("Fetch 2 Complete");

                        info && info.map( (machine) => {
                            let x = machine.item.url
                            details[x] = null;
                        });

                        let urls = Object.keys(details)

                        let y = urls.map( async (url) => {
                            return await axios.get(url).then( (info) => {
                                details[url] = info
                            });
                        });

                        Promise.all(y).then( (res) => {
                            console.log('Fetch 3 Complete');
                            setMachineData( {details: details, info: info, pageData: {count: data.count, getPage: currPage} });
                        });
                    });

                } catch (err) {
                    setMachineData(null);
                    console.log(err);
                };
            };
            fetchList();

        }, [ props.match.params.page ]
    );

    // Display as Data is Fetched
    if (!machineData) {
        col =  (
            <Row className = 'page'>
                <Row>
                    <h1> LOADING... </h1>
                </Row>
                <br />
                <Row>
                    <img alt = 'loading' src = {loading} className = 'loading' />
                </Row>
            </Row>
        );
    };

    if (machineData && (machineData.pageData.getPage * 15 <= machineData.pageData.count)) {
        desc = (
            <p>
                Machines are the representation of items that teach moves to Pokémon. They vary from 
                version to version, so it is not certain that one specific TM or HM corresponds to a 
                single Machine.
            </p>
        )
        col = machineData && machineData.info && machineData.info.map( (machine, index) => {
            let ind = machine
            let ind2 = machineData.details

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
    if (machineData === null || (machineData && machineData.pageData.getPage > Math.floor(machineData.pageData.count / 15))) {
        return (
            <NotFound/>
        ); 
    };

    // Pagination Helper Function
    const pageNum = (bool) => {
        let page = 0
        if (bool) {
            page = machineData.pageData.getPage + 1;
        } else {
            page = machineData.pageData.getPage - 1;
        };
        setGetPage(page);
    };
        
    // Pagination Component
    if (machineData && (machineData.pageData.getPage <= Math.floor(machineData.pageData.count / 15))) {
        page = <Page pageNum = {[pageNum, machineData.pageData.getPage, machineData.pageData.count, 'machines']} />
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