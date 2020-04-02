import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import noImage from '../img/None.jpeg';
import loading from '../img/loading.png';
import Page from './Page';
import NotFound from './NotFound';

const Berries = (props) => {
    const [ berryData, setBerryData ] = useState(undefined);
    const [ getPage, setGetPage ] = useState(0);

    let img = null;
    let col = null;
    let page = null;
    let currPage = null;
    let desc = null;
    let details = [];

    useEffect( 
        () => {
            currPage = Number(props.match.params.page);

            async function fetchList() {
                try {                    
                    // Get currPage Berries Object
                    const { data } = await axios.get("https://pokeapi.co/api/v2/berry/?limit=15&offset=" + (currPage * 15).toString());

                    // Get details for each pokemon in data req
                    let x = await data.results.map( async (berry) => {
                        return await axios.get("https://pokeapi.co/api/v2/item/" + berry.name + '-berry').then( (indiv) => {
                            details.push(indiv);
                        });
                    });

                    Promise.all(x).then( (res) => {
                        console.log("Fetch Complete")
                        setBerryData( {details: details, pageData: {count: data.count, getPage: currPage} });
                    });

                } catch (err) {
                    setBerryData(null);
                    console.log(err);
                };
            };

            fetchList();
        }, [ getPage ]
    );

    // Display as Data is Fetched
     if (!berryData) {
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

    // List Berry Cards with Sprite & Name
    if (berryData && (berryData.pageData.getPage * 15 <= berryData.pageData.count)) {
        desc = (
            <p> 
                Berries are small, juicy, fleshy fruit. As in the real world, a large variety exists in 
                the Pokémon world, with a large range of flavors, names, and effects. Many Berries have 
                become critical held items in battle, where their various effects include HP and status 
                condition restoration, stat enhancement, and even damage negation. 
            </p>
        );

        col = berryData && berryData.details.map( (berry) => {
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
    if (berryData === null || (berryData && berryData.pageData.getPage > Math.floor(berryData.pageData.count / 15))) {
        return (
            <NotFound/>
        ); 
    };

    // Pagination Helper Function
    const pageNum = (bool) => {
        let page = 0
        if (bool) {
            page = berryData.pageData.getPage + 1;
        } else {
            page = berryData.pageData.getPage - 1;
        };
        setGetPage(page);
    };

    // Pagination Component
    if (berryData && (berryData.pageData.getPage <= Math.floor(berryData.pageData.count / 15))) {
        page = <Page pageNum = {[pageNum, berryData.pageData.getPage, berryData.pageData.count, 'berries']} />
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