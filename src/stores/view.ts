import {defineStore} from "pinia";
import serviceLogger from "@/utils/logger.custom.util";
import {ref} from "vue";


export const useViewStore = defineStore('view', () => {
    const logger = serviceLogger('popupStore')
    const url = import.meta.env.VITE_API_URL;

    const modules = ref([]);
    const assignments = ref([]);

    const fetchAllModules = async () => {
        try {
            const response = await fetch(`${url}/api/module/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched modules: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch modules: ${data.message}`);
                throw new Error(`Failed to fetch modules: ${data.message}`);
            }
            modules.value = data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch modules: ${error.message}`);
            throw new Error(`Failed to fetch modules: ${error.message}`);
        }
    }

    const fetchAllAssignments = async () => {
        try {
            const response = await fetch(`${url}/api/assignment/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched assignments: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch assignments: ${data.message}`);
                throw new Error(`Failed to fetch assignments: ${data.message}`);
            }
            assignments.value = data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch assignments: ${error.message}`);
            throw new Error(`Failed to fetch assignments: ${error.message}`);
        }
    }

    async function fetchData() {
        await fetchAllModules()
        await fetchAllAssignments()
    }

    fetchData()

    return {
        modules,
        assignments,
        fetchAllModules,
        fetchAllAssignments
    }
});