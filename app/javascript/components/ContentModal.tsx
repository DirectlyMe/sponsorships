/*
    Use this as a way to flexibly render whatever elements you need in a modal that overlays the UI completely.
 */
import React, { useEffect } from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
`;

const ContentStyle = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 20px;
`;

const ExitButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 30px;
`;

const ContentModal = ({ children, show, setShow }) => {
    const navbar = document.getElementById('nav-section');

    useEffect(() => {
        // set the nav to -1 so the modal displays over it
        if (show)
            navbar.style.zIndex = '-1';
    })

    function exit() {
        // put the nav back into a regular 1 index so it does not encounter user interaction issues
        navbar.style.zIndex = "1";
        setShow(false);
    }

    return (
        <>
            {
                show ? (
                    <ModalStyle>
                        <ExitButton onClick={() => exit()}>Exit Modal</ExitButton>
                        <ContentStyle>
                            {children}
                        </ContentStyle>
                    </ModalStyle>
                ) : null
            }
        </>
    );
}

export default ContentModal;