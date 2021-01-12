/*
    Use this as a way to flexibly render whatever elements you need in a modal that overlays the UI completely.
 */
import React from "react";
import styled, { css } from "styled-components";

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
    z-index: 10000;
    background-color: rgba(0,0,0,.5);
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
    return (
        <>
            {
                show ? (
                    <ModalStyle>
                        <ExitButton onClick={() => setShow(false)}>Exit Modal</ExitButton>
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