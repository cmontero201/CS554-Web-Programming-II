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

const BerryDetail = (props) => {
    const [berryData, setBerryData ] = useState(undefined);

    let history = useHistory();
    let img = null;
    let name = null;
    let size = null;
    let firmness = null;
    let flavors = null;
    let cat = null;
    let natural_gift = null;
    let effect = null;

    useEffect( 
        () => {
            async function fetchList() {
                try {
                    // Get Berry Details with id
                    const data = await axios.get('https://pokeapi.co/api/v2/item/' + props.match.params.id);

                    await axios.get('https://pokeapi.co/api/v2/berry/' + data.data.name.split('-')[0]).then( (desc) => {
                        setBerryData( 
                            {
                                id: desc.data.id,
                                name: desc.data.name, 
                                size: desc.data.size,
                                firmness: desc.data.firmness.name,
                                flavors: desc.data.flavors,
                                natural_gift: desc.data.natural_gift_type.name,
                                effect: data.data.effect_entries[0].effect,
                                cat: data.data.category.name,
                                img: data.data.sprites.default
                            }
                        );
                    });

                } catch (err) {
                    setBerryData(null);
                    console.log(err);
                };
            };
            fetchList();

        }, [ props.match.params.id ]
    );

    if (berryData) {
        if (berryData.img) {
            img = <img alt = {berryData.name + "Image"} src = {berryData.img} />
        } else {
            img = <img alt = {berryData.name + "Image"} src = {noImage} />
        };

        name = berryData.name;
        size = (berryData.size * 0.0393701).toFixed(1);
        firmness = berryData.firmness;
        cat = berryData.cat;
        natural_gift = berryData.natural_gift;
        effect = berryData.effect;

        flavors = berryData.flavors && berryData.flavors.map( (flavor) => {
            if (flavor.potency > 0) {
                return (
                    <Col key = {flavor.flavor.name}>
                        {flavor.flavor.name} ({flavor.potency})
                    </Col>   
                );
            } else {
                return null;
            };
        });
    };

    // NotFound Component if no PokeData
    if (berryData === null) {
        return (
            <NotFound/>
        );
    };
    
    if (berryData) {
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

                <Row xs = {1} sm = {1} md = {2} lg = {5} className = 'detailsContent'>
                    <Col>
                        <h2 className = 'subhead'> Size: </h2> {size} in
                    </Col>
                    <Col>
                        <h2 className = 'subhead'> Firmness </h2> {firmness}
                    </Col>
                    <Col>
                        <h2 className = 'subhead'> Category </h2> {cat} 
                    </Col>

                    <Col>
                        <h2 className = 'subhead'> Natural Gift </h2> {natural_gift}
                    </Col>

                    <Col>
                        <h2 className = 'subhead'> Flavors </h2>
                        <Col className = 'detailsContent'>
                            {flavors}
                        </Col>
                    </Col>                
                </Row>
                <br />
                <h1 className = 'subhead'> Description </h1>
                <Row id = 'effect'>
                    <p> {effect} </p>  
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

export default BerryDetail;