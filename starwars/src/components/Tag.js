import React from "react";

import styled from "styled-components";

export default function Tag({ className, info }) {
    return (
        <div className={className}>
            <StyledTagLeft className={`tag_left`}>{info[0]}</StyledTagLeft>
            <StyledTagRight className={`tag_right`}>{info[1]}</StyledTagRight>
        </div>
    );
}

export const StyledTag = styled(Tag)`
    margin-top: 20px;
`;

const StyledTagLeft = styled.span`
    padding: 5px;
    color: white;
    background: #3288e8;
`;

const StyledTagRight = styled.span`
    padding: 5px;
    color: white;
    background: #3795ff;
`;
