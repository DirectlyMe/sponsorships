import React, {useEffect, useState, useContext, useCallback} from "react";
import styled, { css } from "styled-components";
import { User } from "UserTypes";
import { useDropzone } from "react-dropzone";
import { updateUserAttributes, uploadProfileImage } from "../helpers/user_requests";
import get = Reflect.get;

const ProfileLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-width: 800px;
    max-width: 1200px;
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
        max-width: 600px;
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

interface Props {
    sponsee: User;
    getSponsees: () => void;
}

export default (props: Props) => {
    const { sponsee, getSponsees } = props;

    const [ profileImage, setProfileImage ] = useState<File>(null);
    const [ preview, setPreview ] = useState<string>(sponsee.profileImage);
    const [ firstName, setFirstName ] = useState<string>(sponsee.firstName);
    const [ lastName, setLastName ] = useState<string>(sponsee.lastName);
    const [ email, setEmail ] = useState<string>(sponsee.email);
    const [ phone, setPhone ] = useState<string>(sponsee.phone);
    const [ description, setDescription ] = useState<string>(sponsee.description);
    const [ error, setError ] = useState<string>();
    const [ success, setSuccess ] = useState<boolean>(false);

    async function updateUser(e) {
        // ignore the default form event to prevent a forced refresh
        e.preventDefault();
        // reset request status state
        setError(null);
        setSuccess(false);

        // update user attributes
        try {
            await updateUserAttributes(sponsee.userId, {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "description": description
            }, getSponsees)
        }
        catch (error) {
            setError('Could not update user attributes');
            return;
        }

        // upload the new profile image
        if (profileImage != null) {
            try {
                await uploadProfileImage(profileImage, sponsee.userId, getSponsees)
            }
            catch(error) {
                setError('Could not set image');
                return;
            }
        }

        // set success to true if we made it to the end without any errors
        setSuccess(true);
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
                {
                    error != null ? <div>{error}</div> : null
                }
                {
                    success ? <div>Save Successful!</div> : null
                }
                <FieldsForm onSubmit={async (e) => await updateUser(e)}>
                    <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                    <input placeholder="E-mail Address" value={email} onChange={e => setEmail(e.target.value)} />
                    <textarea placeholder="Describe yourself" value={description} onChange={e => setDescription(e.target.value)} />
                    <button type="submit">Save</button>
                </FieldsForm>
            </FieldsSection>
        </ProfileLayout>
    )
}