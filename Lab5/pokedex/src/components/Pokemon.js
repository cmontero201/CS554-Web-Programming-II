import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import noImage from '../img/None.jpeg'
import Page from './Page'
import NotFound from './NotFound'

const Pokemon = (props) => {
    const [ pokeData, setPokeData ] = useState(undefined);
    const [ pageData, setPageData ] = useState({});
    const [ getPage, setGetPage ] = useState(0);

    let img = null;
    let col = null;
    let page = null;
    let currPage = null;
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
                    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + (currPage * 20).toString());

                    // Get details for each pokemon in Pokelist
                    if (data) {
                        await data.results.map( async (pokemon) => {
                            return await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name).then( (indiv) => {
                                details.push(indiv);
                            });
                        });
                    };

                    await sleep(200);

                    setPokeData(details)
                    setPageData( {count: data.count, next: data.next, prev: data.previous} );

                } catch (err) {
                    setPokeData(null)
                    console.log(err);
                };
            };

            fetchList();
        }, [ getPage ]
    );
    
    // List Pokemon Cards with Sprite & Name
    if (pokeData && (getPage * 20 <= pageData.count)) {
        col = pokeData && pokeData.map( (pokemon) => {
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
    if (pokeData === null || getPage > Math.floor(pageData.count / 20)) {
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
        page = <Page pageNum = {[pageNum, getPage, pageData.count, 'pokemon']} />
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