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
                    const d = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=15&offset=" + (currPage * 15).toString()).then( async ( {data} ) => {
                        if (data.results.length > 0) {
                            return Promise.all(await data.results.map( async (pokemon) => {
                                return await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name).then( (indiv) => {
                                    details.push(indiv);
                                }).then( async (res) => {
                                    setPokeData( {details: details, pageData: {count: data.count, getPage: currPage} } ); 
                                });
                            }));
                        } else {
                            setPokeData(null)
                        };
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
    if (!pokeData || (pokeData && (pokeData.pageData.count - (pokeData.pageData.getPage * 15) > 15) && pokeData.details.length < 15)) {
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
    } 

    // List Pokemon Cards with Sprite & Name
    if (pokeData && pokeData.details.length === 15 && (pokeData.pageData.getPage * 15 < pokeData.pageData.count)) {
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
                        <Link className = 'land' to = {`/pokemon/${individual.id}`}>
                            {img} 
                            <br />
                            {individual.name}
                        </Link>
                    </div>
                </Col>
            );
        });
    } else if (pokeData && (pokeData.pageData.count - (pokeData.pageData.getPage * 15) < 15)) {        
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
                        <Link className = 'land' to = {`/pokemon/${individual.id}`}>
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
        let page = pokeData.pageData.getPage
        if (bool) {
            page ++;
            setGetPage(page);
        } else {
            page --;
            setGetPage(page);
        };
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