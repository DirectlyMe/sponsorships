import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import StatusBar from "./StatusBar";

const ContentSection = styled.div`
    display: flex;
    margin-top: 120px;
    @media (min-width: 900px) {
        width: calc(100vw - 350px);
        margin-left: 340px;
        padding: 0;
    }
    @media (max-width: 899px) {
    }
`

const StatusBarSection = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 90px;
    border-bottom: 1px solid;
    
    @media (min-width: 900px) {
    }
    @media (max-width: 899px) {
    }
`

const NavbarSection = styled.div`
    position: fixed;
    left: 0;
    top: 200px;
    width: 300px;
    height: 70vh;
    border-right: 1px solid;
    
    @media (min-width: 900px) {
    }
    @media (max-width: 899px) {
    }
`

const Layout = ({ children }) => {
    const { authenticated } = useContext(UserContext);
    return (
        authenticated ? (
            <>
                <StatusBarSection>
                    <StatusBar />
                </StatusBarSection>
                <NavbarSection id="nav-section">
                    <Navbar />
                </NavbarSection>
                <ContentSection>
                    {children}
                </ContentSection>
            </>
        ) : null
    )
}

export default Layout;