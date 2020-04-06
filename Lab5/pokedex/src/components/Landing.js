import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PokemonLink from '../img/PokemonLink.png';
import BerriesLink from '../img/BerriesLink.png'
import MachinesLink from '../img/MachinesLink.png'

const Landing = () => {
    return (
        <Container className = 'main'>
            <br />
            <Row className = 'desc-title'>
                <h1 className = 'desc-head'> WELCOME TO PALLETE TOWN'S <br/> OAK POKéMON RESEARCH LAB!</h1>
            </Row>
            <br />
            <br />
            <Row>
                <Col lg = {6} md = {6} sm = {12}> 
                    <Row className = 'desc-title'>
                        <h2> What is a Pokémon? </h2>
                    </Row>
                    <Row className = 'desc'>
                        <p>
                        Did you know that the world is inhabited by creatures known as Pokémon? Pokémon
                        can be found in all corners of the world: some run across sprawling plains, others
                        fly through the open skies, some in the high mountains, or in dense forests, or 
                        various coasts and bodies of water! Scientists such as Professor Samual Oak (who's 
                        laboratory is located right here in Pallete Town!) have dedicated their lives to 
                        studying the characteristics and behavior patterns of Pokémon in their natural 
                        envionment. All the information learned through research is sompiled into the Pokédex, 
                        a device that acts as a digital encylocpedia created by Professor Oaks to find and 
                        record data on each Pokémon.

                        </p>
                    </Row>
                </Col>
        
                <Col lg = {6} md = {6} sm = {12}> 
                    <Row  className = 'desc-title'>
                        <h2> The Pokédex </h2>
                    </Row>
                    <Row className = 'desc'>
                        <p>
                        People who catch, train, care for, and battle with Pokémon are known as Pokémon 
                        Trainers. Many trainers traverse the world to perfect their techniques, collecting Gym 
                        Badges, and of course, finding new Pokémon! When a trainer stumbles upon new or 
                        unfamiliar Pokémon. Pokédex entries on this site will include height, weight, type, bilites, 
                        moves, and a picture of the Pokémon. The Pokédex can also used to record information about 
                        berries and machines - important items every trainer can use on their Pokémon in their journery 
                        to becoming a Pokémon Master.

                        Use the links below to find lists of available Pokémon, Berries, and Machines in 
                        our database! 
                        </p>
                    </Row>
                </Col>
            </Row>
            <br />
            <br />

            <Row className = 'main-links'>
                <Col> 
                    <Link to = '/pokemon/page/0'> 
                        <p className = 'land'> Click Here for </p>
                        <img alt = 'PokemonLink' src = {PokemonLink} />
                    </Link>
                </Col>
                <Col> 
                    <Link to = '/berries/page/0'>
                        <p className = 'land'> Click Here for </p>
                        <img alt = 'BerriesLink' src = {BerriesLink} />
                    </Link>
                </Col>

                <Col> 
                    <Link to = '/machines/page/0'>
                        <p className = 'land'> Click Here for </p>
                        <img alt = 'MachinesLink' src = {MachinesLink} />
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Landing;


