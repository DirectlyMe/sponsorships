import React, { useState, useContext } from "react";
import { DirectUpload } from "@rails/activestorage";
import { UserContext } from "../contexts/UserContext";
import { getCSRF} from "../helpers/fetch_helpers";

const UserProfile = () => {
    const { user } = useContext(UserContext);

    function uploadFile(file) {

    }

    return (
        <div>
            <form onSubmit={uploadFile}>
                <input type="file" />
            </form>
        </div>
    );
}

export default UserProfile;