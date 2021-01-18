import React, {useState, useEffect, useContext, useCallback} from "react";
import { UserContext } from "../contexts/UserContext";
import { uploadProfileImage } from "../helpers/image_uploads";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";
import { getCSRF } from "../helpers/fetch_helpers";

const ProfileLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    align-items: center;
    justify-content: center;
    
    img {
        width: 100%;
        height: 100%;
    }
`;

const FieldsSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    align-items: center;
    justify-content: center;
`;

const FieldsForm = styled.form`
    display: flex;
    flex-direction: column;
    
    input {
        padding: 10px 20px 10px 20px;
        margin: 10px;
        width: 350px;
    }
    
    textarea {
        padding: 10px 20px 10px 20px;
        margin: 10px;
        width: 350px;
    }
    
    button {
        width: 200px;
        padding: 10px 20px;
        margin-top: 10px;
        margin-left: 203px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, .6);
    }
`

const UserProfile = () => {
    const { loading, user, getUser } = useContext(UserContext);
    const [ profileImage, setProfileImage ] = useState<File>();
    const [ preview, setPreview ] = useState<string>();
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ phone, setPhone ] = useState<string>('');
    const [ id, setID ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');

    useEffect(() => {
       setup().then(res => 'promise handled');
    }, [loading]);

    async function setup() {
        if (!loading) {
            setPreview(user.profileImage);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            setID(user.employeeId);
            setDescription(user.description);
        }
    }

    async function updateUser() {
        // TODO: submit update attributes
        const result = await fetch(`/users/${user.userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            ...getCSRF()
                        },
                        body: JSON.stringify({
                            "first_name": firstName,
                            "last_name": lastName,
                            "email": email,
                            "phone": phone,
                            "employee_id": id,
                            "description": description
                        })
            });

        if (result.status / 100 !== 2)
            throw Error('User update failed');

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
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        preview == null ?
                            <img alt="profile image" src="https://via.placeholder.com/500x500?text=Upload+An+Image" />
                            : <img alt="profile image" src={preview} />
                    }
                </div>
            </ImageSection>
            <FieldsSection>
                <FieldsForm onSubmit={async () => await updateUser()}>
                    <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                    <input placeholder="E-mail Address" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Social Worker ID" value={id} onChange={e => setID(e.target.value)}/>
                    <textarea placeholder="Describe yourself" value={description} onChange={e => setDescription(e.target.value)} />
                    <button type="submit">Save</button>
                </FieldsForm>
            </FieldsSection>
        </ProfileLayout>
    );
}

export default UserProfile;