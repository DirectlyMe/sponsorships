import { getCSRF } from "./fetch_helpers";
import { DirectUpload } from "@rails/activestorage";

// update a user's profile image
export async function uploadProfileImage(file: File, userId: number, callback: () => any = null) {
    const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads');
    upload.create(async (error, blob) => {
        if (error)
            throw Error('Could not upload image');
        else {
            const response = await fetch(`/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...getCSRF()
                },
                body: JSON.stringify({profile_image: blob.signed_id})
            })

            if (Math.floor(response.status / 100) !== 2)
                throw Error('Could not upload image');

            if (callback !== null && response) await callback();
        }
    });
}

// update user attributes
export async function updateUserAttributes(userId: number, userAttrs: Object, callback: () => any = null) {
    const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getCSRF()
        },
        body: JSON.stringify({
            ...userAttrs
        })
    });

    // check the http status, if its not in the 200s set error
    if (Math.floor(response.status / 100) !== 2)
        throw Error('Failed to update user attributes');

    if (callback !== null && response) await callback();
}

