import React from 'react';

import styled from 'styled-components';
import { StyledTag } from './Tag';

export default function Card({ character }) {
    const { name } = character;
    const attrs = ["height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    return (
        <CardWrapper>
            <CardHeader>
                <h1>{name}</h1>
            </CardHeader>
            <CardContent>
                {
                    attrs.map((item, index) => {
                        return <StyledTag key={index} info={[item, character[item]]} />
                    })
                }
            </CardContent>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex-wrap: no-wrap;
    flex-basis: 30%;

    margin-bottom: 15px;
`;

const CardHeader = styled.div`
    background: #4C93EF;
    color: white;
    display:flex;
    justify-content: flex-start;
    padding: 0 15px;
`;

const CardContent = styled.div`
    background: #EAEAEA;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    padding: 0 15px 15px;
`;