import React from "react";
import styled from "styled-components";

const Div = styled.div`
    height: auto;
    width: min-content;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 16px;
`

const Img = styled.img`
    height: 128px;
    width: auto;
    border-radius: 100%;
`

export default function Aluratubers(props) {
    return (
        <Div>
            <a href={props.url} target="_blank" >
                <Img src={props.image} />
            </a>
            <span>{props.name}</span>
        </Div>
    );
}
