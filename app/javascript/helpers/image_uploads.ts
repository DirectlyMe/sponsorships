import { getCSRF } from "./fetch_helpers";
import { DirectUpload } from "@rails/activestorage";

export async function uploadProfileImage(file: File, userId: number, callback: () => any = null)
{
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

            if (callback !== null && response) await callback();

            if (Math.floor(response.status / 100) !== 2)
                throw Error('Could not upload image');
        }
    });
}