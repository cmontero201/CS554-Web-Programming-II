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

const Pokemon = (props) => {
    const [ pokeData, setPokeData ] = useState(undefined);
    // const [ pageData, setPageData ] = useState({});
    const [ getPage, setGetPage ] = useState(0);

    let img = null;
    let col = null;
    let page = null;
    let currPage = null;
    let details = [];

    useEffect( 
        () => {
            currPage = Number(props.match.params.page);
            
            async function fetchList() {
                try {                    
                    // Get currPage Pokemon Object
                    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=15&offset=" + (currPage * 15).toString());

                    // Get details for each pokemon in data req
                    let x =  await data.results.map( async (pokemon) => {
                        return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name).then( (indiv) => {
                            details.push(indiv);
                        });
                    });

                    Promise.all(x).then( (res) => { 
                        console.log("Fetch Complete")
                        setPokeData( {details: details, pageData: {count: data.count, getPage: currPage} });
                    });

                } catch (err) {
                    setPokeData(null);
                    console.log(err);
                };
            };

            fetchList();
        }, [ getPage ]
    );
    
    // Display as Data is Fetched
    if (!pokeData) {
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

    // List Pokemon Cards with Sprite & Name
    if (pokeData && (pokeData.pageData.getPage * 15 <= pokeData.pageData.count)) {
        col = pokeData.details && pokeData.details.map( (pokemon) => {
            let individual = pokemon.data;
            if (pokemon.data && pokemon.data.sprites.front_default) {
                img = <img alt = {pokemon.data.name + "Image"} src = {pokemon.data.sprites.front_default} />
            } else {
                img = <img className = 'notFound' alt = {pokemon.data.name + "Image"} src = {noImage} />
            };

            return (
                <Col className = 'pokeCol' key = {individual.id}>
                    <div className = 'pokeLink'>
                        <Link to = {`/pokemon/${individual.id}`}>
                            {img} 
                            <br />
                            {individual.name}
                        </Link>
                    </div>
                </Col>
            );
        });
    };

    // NotFound Component if no PokeData
    if (pokeData === null || (pokeData && pokeData.pageData.getPage > Math.floor(pokeData.pageData.count / 15))) {
        return (
            <NotFound/>
        ); 
    };

    // Pagination Helper Function
    const pageNum = (bool) => {
        let page = 0
        if (bool) {
            page = pokeData.pageData.getPage + 1;
        } else {
            page = pokeData.pageData.getPage - 1;
        };
        setGetPage(page);
    };
     
    // Pagination Component
    if (pokeData && pokeData.pageData.getPage <= Math.floor(pokeData.pageData.count / 15)) {
        page = <Page pageNum = {[pageNum, pokeData.pageData.getPage, pokeData.pageData.count, 'pokemon']} />
    } else {
        page = null
    };

    return (
        <Container>
            <br />
            <br />
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

export default Pokemon;