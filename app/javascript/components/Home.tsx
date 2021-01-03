import React, { useEffect, useState, useContext, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DirectUpload } from "@rails/activestorage";
import { UserContext } from "../contexts/UserContext";
import { getCSRF } from "../helpers/fetch_helpers";

const Home = () => {
    const { user, loading } = useContext(UserContext);
    const [ files, setFiles ] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles([...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    async function submitFile(file)
    {
        const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads');
        upload.create((error, blob) => {
            if (error)
               console.log(error);
            else{
                fetch(`/users/${user.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getCSRF()
                },
                body: JSON.stringify({profile_image: blob.signed_id})
                })
                .then(response => response.json())
                .then(result => console.log(result));
            }
        });
    }

    return (
        <div>
            <h3>Welcome { !loading ? <span>{user.firstName} {user.lastName}!</span> : null }</h3>
            <div>
                <h3>Your Action Items: </h3>
                { !loading ?
                    user.actionItems.map((item, i) => <span key={i}>{item.subject}</span>)
                    : null}
            </div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here...</p> :
                        <p>Drag 'n' drop some files here, or click the select files</p>
                }
            </div>
            { /* @ts-ignore */ }
            <button onClick={() => submitFile(files[0]).then(res => console.log('file uploaded'))}>submit file</button>
            <img src={user.profileImage}/>
        </div>
    );
};

export default Home;
