import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import noImage from '../img/None.jpeg'
import Page from './Page'
import axios from 'axios';
import NotFound from './NotFound'

const Pokemon = (props) => {
    const [ pokeData, setPokeData ] = useState(undefined);
    const [ pageData, setPageData ] = useState({})
    const [ getPage, setGetPage ] = useState(0)

    let img = null;
    let col = null;
    let page = null;
    let currPage = null;
    let details = [];
    let info = null

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect( 
        () => {
            async function fetchList() {
                try {
                    currPage = Number(props.match.params.page)
                    setGetPage(currPage)
                    
                    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + (currPage * 20).toString());

                    if (data) {
                        const info = await data.results.map( (pokemon) => {
                            return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name).then( (indiv) => {
                                details.push(indiv);
                            });
                        });
                    }

                    await sleep(500);
                    console.log("!!!!", details)

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
    
    if (pokeData && (getPage * 20 <= pageData.count)) {
        col = pokeData && pokeData.map( (pokemon) => {
            let individual = pokemon.data
            if (pokemon.data && pokemon.data.sprites.front_default) {
                img = <img alt = {pokemon.data.name + "Image"} src = {pokemon.data.sprites.front_default} />
            } else {
                img = <img alt = {pokemon.data.name + "Image"} src = {noImage} />

            }

            return (
                <Col id = 'pokeCol' key = {individual.order}>
                    <div id = 'pokeLink'>
                        <Link to = {`/pokemon/${individual.id}`}>
                            {img}
                            <br />
                            {individual.name}
                        </Link>
                    </div>
                </Col>
            );
        });
    } 
    if (pokeData === null || getPage > Math.floor(pageData.count / 20)) {
        return(
            <NotFound/>
        ); 
    };

    const pageNum = (bool) => {
        let page = 0
        if (bool) {
            page = getPage + 1
        } else {
            page = getPage - 1
        }
        setGetPage(page)
    }

    if (getPage <= Math.floor(pageData.count / 20)) {
        page = <Page pageNum = {[pageNum, getPage, pageData.count]} />
    } else {
        page = null
    }

    return (
        <Container>
            <br />
            <br />
            <Row id = 'page' sm = {1} md = {3} lg = {5}>
                {col} 
            </Row>
            <br />
            <Row id ='page'> 
                {page}
            </Row>
        </Container>
    );
};

export default Pokemon;