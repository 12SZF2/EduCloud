import {defineStore} from "pinia";
import serviceLogger from "@/utils/logger.custom.util";

export const useUserStore = defineStore('adminUser', () => {
    const logger = serviceLogger('adminUserStore')
    const url = import.meta.env.VITE_API_URL;

    async function fetchAllUsers() {
        try {
            const response = await fetch(`${url}/api/admin/user/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched users: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch users: ${data.message}`);
                throw new Error(`Failed to fetch users: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch users: ${error.message}`);
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }

    async function fetchUserById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/user/get-by-id?id=${id}`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched user: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch user: ${data.message}`);
                throw new Error(`Failed to fetch user: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch user: ${error.message}`);
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    }

    async function createUser({username, password, displayName, email, birthDate, roles}: {
        username: string,
        password: string,
        displayName: string,
        email: string,
        birthDate: string,
        roles: string[]
    }) {
        try {
            const response = await fetch(`${url}/api/admin/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({username, password, displayName, email, birthDate, roles}),
            });
            const data = await response.json();
            logger.debug(`Uploaded user: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to upload user: ${data.message}`);
                throw new Error(`Failed to upload user: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to upload user: ${error.message}`);
            throw new Error(`Failed to upload user: ${error.message}`);
        }
    }

    async function updateUserById({id, username, password, displayName, email, birthDate, roles}: {
        id: string,
        username: string,
        password: string,
        displayName: string,
        email: string,
        birthDate: string,
        roles: string[]
    }) {
        try {
            const response = await fetch(`${url}/api/admin/user/update-by-id?id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({username, password, displayName, email, birthDate, roles}),
            });
            const data = await response.json();
            logger.debug(`Uploaded user: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to upload user: ${data.message}`);
                throw new Error(`Failed to upload user: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to upload user: ${error.message}`);
            throw new Error(`Failed to upload user: ${error.message}`);
        }
    }

    async function deleteUserById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/user/delete?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Deleted user: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to delete user: ${data.message}`);
                throw new Error(`Failed to delete user: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to delete user: ${error.message}`);
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }

    return {
        fetchAllUsers,
        fetchUserById,
        createUser,
        updateUserById,
        deleteUserById,
    }
});