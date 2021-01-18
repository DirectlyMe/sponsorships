import React, {useState, useEffect, useContext, useCallback} from "react";
import { UserContext } from "../contexts/UserContext";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";
import { updateUserAttributes, uploadProfileImage } from "../helpers/user_requests";

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

const UserProfile = () => {
    const { loading, user, getUser } = useContext(UserContext);
    const [ profileImage, setProfileImage ] = useState<File>(null);
    const [ preview, setPreview ] = useState<string>();
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ phone, setPhone ] = useState<string>('');
    const [ id, setID ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const [ error, setError ] = useState<string>();
    const [ success, setSuccess ] = useState<boolean>(false);

    useEffect(() => {
       hydrate().then(res => 'component state hydrated');
    }, [loading]);

    async function hydrate() {
        if (loading) return;
        setPreview(user.profileImage);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setID(user.employeeId);
        setDescription(user.description);
    }

    async function updateUser(e) {
        // ignore the default form event to prevent a forced refresh
        e.preventDefault();
        // reset request status state
        setError(null);
        setSuccess(false);

        // update user attributes
        try {
            await updateUserAttributes(user.userId, {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
                "employee_id": id,
                "description": description
            }, getUser)
        }
        catch (error) {
            setError('Could not update user attributes');
            return;
        }

        // upload the new profile image
        if (profileImage != null) {
            try {
                await uploadProfileImage(profileImage, user.userId, getUser)
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
                    <input placeholder="Social Worker ID" value={id} onChange={e => setID(e.target.value)}/>
                    <textarea placeholder="Describe yourself" value={description} onChange={e => setDescription(e.target.value)} />
                    <button type="submit">Save</button>
                </FieldsForm>
            </FieldsSection>
        </ProfileLayout>
    );
}

export default UserProfile;