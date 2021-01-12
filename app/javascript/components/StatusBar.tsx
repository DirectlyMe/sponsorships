import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import { UserContext } from "../contexts/UserContext";
import ContentModal from "./ContentModal";

const StatusLayout = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    flexDirection: row;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    width: 100vw;
    height: 90px;
`;

const Title = styled.span`
    font-size: 32px;
`;

const SearchSection = styled.div`
    width: 50vw;
    margin-left: 100px;
    margin-right: 100px;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;  
`;

const StatusBar = () => {
    const { user, loading } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <StatusLayout>
            <Title>Sponsorships</Title>
            <SearchSection>
                <SearchBar />
            </SearchSection>
            { loading ? <ProfileImage src="" /> : <ProfileImage src={user.profileImage} onClick={() => setShowModal(true)} /> }
            <ContentModal show={showModal} setShow={setShowModal}>
                <UserProfile />
            </ContentModal>
        </StatusLayout>
    )
}

export default StatusBar;