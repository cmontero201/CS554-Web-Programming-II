import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import { LinkContainer } from 'react-router-bootstrap'

const Page = (props) => {
    const getNext = () => {
        props.pageNum[0](true);
    };

    const getPrev = () => {
        props.pageNum[0](false);
    };

    let page = Number(props.pageNum[1]);

    if (props.pageNum[1] === 0) {
        return (
            <Pagination>
                <Pagination.Item className = 'pageItem'>  Page {page + 1} </Pagination.Item>
                <LinkContainer to = {`/${props.pageNum[3]}/page/${page + 1}`}>
                    <Pagination.Next className = 'pageLink' onClick = {getNext} />
                </LinkContainer>    
            </Pagination>
        );

    } else if (props.pageNum[1] === Math.floor(props.pageNum[2] / 15)) {
        return (
            <Pagination>
                <LinkContainer to = {`/${props.pageNum[3]}/page/${page - 1}`}>
                        <Pagination.Prev className = 'pageLink' onClick = {getPrev} />
                    </LinkContainer>  
                <Pagination.Item className = 'pageItem'> Page {page + 1} </Pagination.Item>
            </Pagination>
        );

    } else {
        return (
            <Pagination>
                <LinkContainer to = {`/${props.pageNum[3]}/page/${page - 1}`}>
                    <Pagination.Prev className = 'pageLink' onClick = {getPrev} />
                </LinkContainer>    
                <Pagination.Item className = 'pageItem' alt = 'current-page'> Page {page + 1} </Pagination.Item>
                <LinkContainer to = {`/${props.pageNum[3]}/page/${page + 1}`}>
                    <Pagination.Next className = 'pageLink' onClick = {getNext} />
                </LinkContainer>    
            </Pagination>
        );
    };
};

export default Page;