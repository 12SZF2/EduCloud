import serviceLogger from "@/utils/logger.custom.util";
import {defineStore} from "pinia";

export const useModuleStore = defineStore('module', () => {
    const logger = serviceLogger('popupStore')
    const url = import.meta.env.VITE_API_URL;

    async function uploadModule({name, content, description, gradeId, categoryId, professionId}: {
        name: string,
        content: string,
        description: string,
        gradeId: string,
        categoryId: string,
        professionId: string
    }) {
        try {
            const response = await fetch(`${url}/api/admin/module/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({name, content, description, gradeId, categoryId, professionId}),
            });
            const data = await response.json();
            logger.debug(`Uploaded module: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to upload module: ${data.message}`);
                throw new Error(`Failed to upload module: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to upload module: ${error.message}`);
            throw new Error(`Failed to upload module: ${error.message}`);
        }
    }

    async function fetchAllModules() {
        try {
            const response = await fetch(`${url}/api/admin/module/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched modules: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch modules: ${data.message}`);
                throw new Error(`Failed to fetch modules: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch modules: ${error.message}`);
            throw new Error(`Failed to fetch modules: ${error.message}`);
        }
    }

    async function fetchModuleById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/module/get-by-id?id=${id}`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched module: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch module: ${data.message}`);
                throw new Error(`Failed to fetch module: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch module: ${error.message}`);
            throw new Error(`Failed to fetch module: ${error.message}`);
        }
    }

    async function fetchModuleByNames(name: string) {
        try {
            const response = await fetch(`${url}/api/admin/module/get-by-name?name=${name}`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched module: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch module: ${data.message}`);
                throw new Error(`Failed to fetch module: ${data.message}`);
            }
            return data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch module: ${error.message}`);
            throw new Error(`Failed to fetch module: ${error.message}`);
        }
    }

    async function updateModule({id, name, content, description, grades, categories, professions}: {
        id: string,
        name: string,
        content: string,
        description: string,
        grades: { id: string, gradeName: string }[],
        categories: { id: string, categoryName: string }[],
        professions: { id: string, professionName: string }[],
    }) {
        try {
            const response = await fetch(`${url}/api/admin/module/update-by-id?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                // FIXME this is a hack, i just dont want to change the backend rn
                body: JSON.stringify({name, content, description, gradeId: grades[0].id, categoryId: categories[0].id, professionId: professions[0].id}),
            });
            const data = await response.json();
            logger.debug(`Updated module: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to update module: ${data.message}`);
                throw new Error(`Failed to update module: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to update module: ${error.message}`);
            throw new Error(`Failed to update module: ${error.message}`);
        }
    }

    async function deleteModuleById(id: string) {
        try {
            const response = await fetch(`${url}/api/admin/module/delete?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Deleted module: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to delete module: ${data.message}`);
                throw new Error(`Failed to delete module: ${data.message}`);
            }
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to delete module: ${error.message}`);
            throw new Error(`Failed to delete module: ${error.message}`);
        }
    }

    return {
        uploadModule,
        fetchAllModules,
        fetchModuleById,
        fetchModuleByNames,
        updateModule,
        deleteModuleById,
    }
})