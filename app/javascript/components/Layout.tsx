import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "./Navbar"

const ContentSection = styled.div`
    @media (min-width: 900px) {
        width: calc(100vw - 300px);
        margin-left: 300px;
    }
    @media (max-width: 899px) {
        width: 100vw;  
        vertical-align: -300px;
    }
`

const NavSection = styled.div`
    @media (min-width: 900px) {
        position: fixed;
        left: 0;
        top: 0;
        width: 300px;
        height: 100vh;
        border-right: 1px solid;
    }
    @media (max-width: 899px) {
        width: 100vw;
        height: 100px;
    }
`

const Layout = ({ children }) => {
    return (
        <>
            <NavSection>
                <Navbar />
            </NavSection>
            <ContentSection>
                {children}
            </ContentSection>
        </>
    )
}

export default Layout;