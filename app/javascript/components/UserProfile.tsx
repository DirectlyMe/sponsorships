import React, {useState, useEffect, useContext, useCallback} from "react";
import { UserContext } from "../contexts/UserContext";
import { uploadProfileImage } from "../helpers/image_uploads";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";

const ProfileLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    margin-top: 8%;
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    
    img {
        width: 500px;
        height: 600px;
    }
`;

const FieldsSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    margin: 0;
    padding: 0;
`;

const FieldsForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    padding: 10px 20px 10px 20px;
    margin: 10px;
    width: 500px;
`

const UserProfile = () => {
    const { loading, user, getUser } = useContext(UserContext);
    const [ profileImage, setProfileImage ] = useState<File>();
    const [ preview, setPreview ] = useState<string>();

    useEffect(() => {
       setup().then(res => 'promise handled');
    }, [loading]);

    async function setup() {
        if (!loading) setPreview(user.profileImage);
    }

    async function updateUser() {
        // TODO: submit update attributes

        // upload the new profile image
        if (profileImage != null)
            await uploadProfileImage(profileImage, user.userId, await (getUser));
    }

    // handle the onDrop event from Dropzone
    const onDrop = useCallback(acceptedFiles => {
        setProfileImage(acceptedFiles[0]);
        setPreview(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    // get props from Dropzone necessary for component markup
    const { getRootProps, getInputProps } = useDropzone({onDrop})
    return (
        <ProfileLayout>
            <ImageSection>
                <p style={{textAlign: 'center'}} >Profile Image</p>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        preview == null ?
                            <img alt="profile image" src="https://via.placeholder.com/500x500?text=Upload+An+Image" />
                            : <img alt="profile image" src={preview} />
                    }
                </div>
                <button onClick={ async () => await updateUser() }>submit file</button>
            </ImageSection>
            <FieldsSection>
                <span style={{ textAlign: "center", width: "550px" }}>User Fields Placeholder</span>
                <FieldsForm>
                    <Input placeholder="first name"/>
                    <Input placeholder="last name" />
                    <Input placeholder="phone number" />
                    <Input placeholder="email"/>
                    <Input placeholder="social worker ID"/>
                </FieldsForm>
            </FieldsSection>
        </ProfileLayout>
    );
}

export default UserProfile;