import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import noImage from '../img/None.jpeg';
import loading from '../img/loading.png';
import NotFound from './NotFound';

const PokemonDetail = (props) => {
    const [ pokeData, setPokeData ] = useState(undefined);

    let name = null;
    let img = null;
    let height = null;
    let weight = null;
    let typeDiv = [];
    let abilities = [];
    let moves = [];
    let history = useHistory();

    useEffect( 
        () => {
            async function fetchList() {
                try {
                    // Get Pokemon Details with id
                    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/' + props.match.params.id);
                    setPokeData(data);

                } catch (err) {
                    setPokeData(null);
                    console.log(err);
                };
            };

            fetchList();
        }, [ props.match.params.id ]
    );
    
    if (pokeData) {
        let data = pokeData.data;

        // Set Image
        if (data && data.sprites.front_default) {
            img = <img alt = {data.name + "Image"} src = {data.sprites.front_default} />
        } else {
            img = <img alt = {data.name + "Image"} src = {noImage} />
        };

        name = data.name;
        height = data.height * 3.93701 ;                  // convert to inches
        weight = (data.weight * 0.220462).toFixed(1);    // convert to lbs with 1 decimal pt

        typeDiv = data.types && data.types.map( (type) => {
            return (
                <Col key = {type.type.name}>
                    {type.type.name}
                </Col>   
            );
        });

        abilities = data.abilities && data.abilities.map( (ability) => {
            return (
                <Row key = {ability.ability.name} className = 'detailsContent'> 
                    {ability.ability.name}
                </Row>
            );
        });

        moves = data.moves && data.moves.map( (move) => {
            return (
                <Row key = {move.move.name} className = 'detailsContent'>
                    <p> {move.move.name} </p>
                </Row>
            );
        });        
    }; 

    // NotFound Component if no PokeData
    if (pokeData === null) {
        return (
            <NotFound/>
        );
    };

    if (pokeData) {
        return (
            <Container className = 'pokeDetails'>
                <br />
                <Button type="button" id = 'button' onClick={() => history.goBack()}>
                    Go back
                </Button>
                <br />
                <br />
                <Row className = 'imageHeader'>
                    {img}
                </Row>
                <br />
                <Row className = 'detailHead'>
                    <h1> {name} </h1>
                </Row>
                <br />
                <Row xs = {1} sm = {1} md = {2} lg = {4} className = 'detailsContent'>
                    <Col>
                        <h2 className = 'subhead'> Height: </h2>{Math.floor(height / 12) + "' " + Math.ceil(height % 12) + '"'}
                    </Col>
                    <Col>
                        <h2 className = 'subhead'> Weight </h2> {(weight)} lbs
                    </Col>

                    <Col>
                        <h2 className = 'subhead'> Type </h2>
                        <Col className = 'detailsContent'>
                            {typeDiv}
                        </Col>
                    </Col>

                    <Col>
                        <h2 className = 'subhead'> Abilites </h2>
                        <Col className = 'detailsContent'>
                            {abilities}  
                        </Col>
                        
                    </Col>
                </Row>
                <br />
                <Row >
                    <Col className = 'detailsContent'>
                        <h2 className = 'subhead'> Moves </h2>
                        <br />
                        <Row id = 'moves' xs = {1} sm = {3} md = {4} lg = {6}>
                            {moves}
                        </Row>   
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container className = 'pokeDetails'>
                <br />
                <br />
                <Row className = 'page' sm = {3} md = {3} lg = {5}>
                    <Row className = 'page'>
                        <Row>
                            <h1> LOADING... </h1>
                        </Row>
                        <br />
                        <Row>
                            <img alt = 'loading' src = {loading} className = 'loading' />
                        </Row>
                    </Row>
                </Row>
            </Container>
        );
    };
};

export default PokemonDetail;