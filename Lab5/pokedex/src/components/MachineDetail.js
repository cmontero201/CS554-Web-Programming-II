import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import noImage from '../img/None.jpeg';
import loading from '../img/loading.png';
import NotFound from './NotFound';

const MachineDetail = (props) => {
    const [machineData, setMachineData ] = useState(undefined);

    let name = null;
    let img = null;
    let effect = null;
    let cost = null;
    let history = useHistory();


    useEffect( 
        () => {
            async function fetchList() {
                try {
                    await axios.get('https://pokeapi.co/api/v2/machine/' + props.match.params.id).then( async (data) => {
                        let url = data.data.item.url;
                        return await axios.get(url).then( (info) => {
                            setMachineData(info)
                        });
                    });

                } catch (err) {
                    setMachineData(null);
                    console.log(err);
                };
            };

            fetchList();
        }, [props.match.params.id]
    );

    if (machineData) {
        let data = machineData.data;

        // Set Image
        if (data && data.sprites.default) {
            img = <img alt = {data.name + 'Image'} src = {data.sprites.default} />
        } else {
            img = <img alt = {data.name + 'Image'} src = {noImage} />
        }

        name = data.name;
        cost = data.cost;
        effect = data.effect_entries[0].short_effect;
    };

    // NotFound Component if no PokeData
    if (machineData === null) {
        return (
            <NotFound/>
        );
    };

    if (machineData) {
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
                <Row className = 'detailHead'>
                    <h2 className = 'subhead'> Cost: </h2>
                </Row>
                <Row className = 'detailsContent'>
                    {cost} ₽
                </Row>
                <br />
                <Row className = 'detailHead'>
                    <h2 className = 'subhead'> Description: </h2>
                </Row>
                <Row className = 'detailsContent'>
                    {effect}
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

export default MachineDetail;