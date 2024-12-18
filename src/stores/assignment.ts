import serviceLogger from "@/utils/logger.custom.util";
import {defineStore} from "pinia";

export const useAssignmentStore = defineStore('assignment', () => {
    const logger = serviceLogger('popupStore')
    const url = import.meta.env.VITE_API_URL;

    async function uploadAssignment({name, content, description, gradeId, categoryId, professionId}: {name: string, content: string, description: string, gradeId: string, categoryId: string, professionId: string}) {
        try {
            const response = await fetch(`${url}/api/admin/assignment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({name, content, description, gradeId, categoryId, professionId}),
            });
            const data = await response.json();
            logger.debug(`Uploaded assignment: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to upload assignment: ${data.message}`);
                throw new Error(`Failed to upload assignment: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to upload assignment: ${error.message}`);
            throw new Error(`Failed to upload assignment: ${error.message}`);
        }
    }

    async function fetchAllAssignments() {
        try {
            const response = await fetch(`${url}/api/admin/assignment/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched assignments: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch assignments: ${data.message}`);
                throw new Error(`Failed to fetch assignments: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch assignments: ${error.message}`);
            throw new Error(`Failed to fetch assignments: ${error.message}`);
        }
    }

    async function fetchAssignmentById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/assignment/get-by-id?id=${id}`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched assignment: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch assignment: ${data.message}`);
                throw new Error(`Failed to fetch assignment: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch assignment: ${error.message}`);
            throw new Error(`Failed to fetch assignment: ${error.message}`);
        }
    }

    async function fetchAssignmentByNames(name: string) {
        try {
            const response = await fetch(`${url}/api/admin/assignment/get-by-name?name=${name}`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched assignment: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch assignment: ${data.message}`);
                throw new Error(`Failed to fetch assignment: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch assignment: ${error.message}`);
            throw new Error(`Failed to fetch assignment: ${error.message}`);
        }
    }

    async function updateAssignment({id, name, content, description, gradeId, categoryId, professionId}: {id: string, name: string, content: string, description: string, gradeId: string, categoryId: string, professionId: string}) {
        try {
            const response = await fetch(`${url}/api/admin/assignment/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({id, name, content, description, gradeId, categoryId, professionId}),
            });
            const data = await response.json();
            logger.debug(`Updated assignment: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to update assignment: ${data.message}`);
                throw new Error(`Failed to update assignment: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to update assignment: ${error.message}`);
            throw new Error(`Failed to update assignment: ${error.message}`);
        }
    }

    async function deleteAssignmentById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/assignment/delete?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Deleted assignment: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to delete assignment: ${data.message}`);
                throw new Error(`Failed to delete assignment: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to delete assignment: ${error.message}`);
            throw new Error(`Failed to delete assignment: ${error.message}`);
        }
    }

    return {
        uploadAssignment,
        fetchAllAssignments,
        fetchAssignmentById,
        fetchAssignmentByNames,
        updateAssignment,
        deleteAssignmentById,
    }
})