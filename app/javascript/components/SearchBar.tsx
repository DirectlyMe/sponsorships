import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";

const StyledSearch = styled.input`
    font-family: $font-secondary;
    font-size: 16px;
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const SearchBar = () => {
    return (
        <StyledSearch placeholder="test search" />
    )
}

export default SearchBar;