import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import noImage from '../img/None.jpeg'
import axios from 'axios';
import NotFound from './NotFound'

const PokemonDetail = (props) => {
    const [ pokeData, setPokeData ] = useState(undefined);

    let name = null;
    let img = null;
    let height = null;
    let weight = null;
    let typeDiv = [];
    let abilities = []
    let moves = [];
    let history = useHistory();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    useEffect( 
        () => {
            async function fetchList() {
                try {
                    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/' + props.match.params.id);
                    await sleep(200)

                    setPokeData(data)

                } catch (err) {
                    setPokeData(null)
                    console.log(err);
                };
            
            };

            fetchList();

        }, [ ]
    );
    
    if (pokeData) {
        let data = pokeData.data

        if (data && data.sprites.front_default) {
            img = <img alt = {data.name + "Image"} src = {data.sprites.front_default} />
        } else {
            img = <img alt = {data.name + "Image"} src = {noImage} />
        }

        name = data.name
        height = data.height * 3.93701
        weight = data.weight;

        typeDiv = data.types && data.types.map( (type) => {
            return (
                <Col key = {type.type.name}>
                    {type.type.name}
                </Col>   
            );
        });

        abilities = data.abilities && data.abilities.map( (ability) => {
            return (
                <Row key = {ability.ability.name} id = 'detailsContent'> 
                    {ability.ability.name}
                </Row>
            )
        });

        moves = data.moves && data.moves.map( (move) => {
            return (
                <Row key = {move.move.name} id = 'detailsContent'>
                    <p> {move.move.name} </p>
                </Row>
            );
        });        
    } 
    if (pokeData === null) {
        return (
            <NotFound/>
        )
    }

    return (
        <Container id = 'pokeDetails'>
            <br />
            <Button type="button" onClick={() => history.goBack()}>
                Go back
            </Button>
            <br />
            <br />
            <Row id = 'imageHeader'>
                <div>
                    {img}
                </div>
            </Row>
            <br />
            <Row id = 'detailHead'>
                <h1> {name} </h1>
            </Row>
            <br />
            <br />
            <Row xs = {1} sm = {1} md = {2} lg = {4} id = 'detailsContent'>
                <Col>
                    <h2 id = 'subhead'> Height: </h2>{Math.floor(height / 12) + "' " + Math.ceil(height % 12) + '"'}
                </Col>
                <Col>
                    <h2 id = 'subhead'> Weight </h2> {(weight * 0.220462).toFixed(1)} lbs
                </Col>

                <Col>
                    <h2 id = 'subhead'> Type </h2>
                    <Col id = 'detailsContent'>
                        {typeDiv}
                    </Col>
                </Col>

                <Col>
                    <h2 id = 'subhead'> Abilites </h2>
                    <Col id = 'detailsContent'>
                        {abilities}  
                    </Col>
                    
                </Col>
            </Row>
            <br />
            <Row id = 'detailsContent'>
                <Col >
                    <h2 id = 'subhead'> Moves </h2>
                    <br />
                    <Row xs = {1} sm = {3} md = {4} lg = {6} id = 'detailsContent'>
                        {moves}
                    </Row>   
                </Col>
            </Row>
        </Container>
    )
}

export default PokemonDetail