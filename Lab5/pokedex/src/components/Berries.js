import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import noImage from '../img/None.jpeg'
import Page from './Page'
import NotFound from './NotFound'

const Berries = (props) => {
    const [ berryData, setBerryData ] = useState(undefined);
    const [ pageData, setPageData ] = useState({});
    const [ getPage, setGetPage ] = useState(0);

    let img = null;
    let col = null;
    let page = null;
    let currPage = null;
    let desc = null;
    let details = [];

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect( 
        () => {
            currPage = Number(props.match.params.page);

            async function fetchList() {
                try {
                    setGetPage(currPage);
                    
                    // Get currPage Pokelist
                    const { data } = await axios.get("https://pokeapi.co/api/v2/berry/?limit=20&offset=" + (currPage * 20).toString());

                    // Get details for each berry in data
                    if (data) {
                        await data.results.map( async (berry) => {
                            return await axios.get("https://pokeapi.co/api/v2/item/" + berry.name + '-berry').then( (indiv) => {
                                details.push(indiv);
                            });
                        });
                    };

                    await sleep(200);

                    setBerryData(details)
                    setPageData( {count: data.count, next: data.next, prev: data.previous} );

                } catch (err) {
                    setBerryData(null)
                    console.log(err);
                };
            };

            fetchList();
        }, [ getPage ]
    );

    // List Berry Cards with Sprite & Name
    if (berryData && (getPage * 20 <= pageData.count)) {
        desc = (
            <p> 
                Berries are small, juicy, fleshy fruit. As in the real world, a large variety exists in 
                the Pokémon world, with a large range of flavors, names, and effects. Many Berries have 
                become critical held items in battle, where their various effects include HP and status 
                condition restoration, stat enhancement, and even damage negation. 
            </p>
        );

        col = berryData && berryData.map( (berry) => {
            let individual = berry.data;

            if (berry.data && berry.data.sprites.default) {
                img = <img alt = {berry.data.name + "Image"} src = {berry.data.sprites.default} />
            } else {
                img = <img className = 'notFound' alt = {berry.data.name + "Image"} src = {noImage} />
            };

            return (
                <Col className = 'pokeCol' key = {individual.id}>
                    <div className = 'berryLink'>
                        <Link to = {`/berries/${individual.id}`}>
                            {img} 
                            <br />
                            <br />
                            {individual.name}
                        </Link>
                    </div>
                </Col>
            );
        });
    };

    // NotFound Component if no PokeData
    if (berryData === null || getPage > Math.floor(pageData.count / 20)) {
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
        page = <Page pageNum = {[pageNum, getPage, pageData.count, 'berries']} />
    } else {
        page = null;
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
            <Row className ='page'> 
                {page}
            </Row>
        </Container>
    );
};

export default Berries;