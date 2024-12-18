import {defineStore} from "pinia";
import {ref} from "vue";
import serviceLogger from "@/utils/logger.custom.util";

export const usePopupStore = defineStore('popup', () => {
    const logger = serviceLogger('popupStore')
    const url = import.meta.env.VITE_API_URL;

    const categories = ref([]);
    const professions = ref([]);
    const grades = ref([]);

    async function fetchAllCategories() {
        try {
            const response = await fetch(`${url}/api/admin/category/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            logger.debug(`Fetched categories: ${JSON.stringify(data)}`);
            if (!response.ok) {
                logger.error(`Failed to fetch categories: ${data.message}`);
                throw new Error(`Failed to fetch categories: ${data.message}`);
            }
            categories.value = data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch categories: ${error.message}`);
            throw new Error(`Failed to fetch categories: ${error.message}`);
        }
    }

    async function fetchAllProfessions() {
        try {
            const response = await fetch(`${url}/api/admin/profession/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                logger.error(`Failed to fetch professions: ${data.message}`);
                throw new Error(`Failed to fetch professions: ${data.message}`);
            }
            professions.value = data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch professions: ${error.message}`);
            throw new Error(`Failed to fetch professions: ${error.message}`);
        }
    }

    async function fetchAllGrades() {
        try {
            const response = await fetch(`${url}/api/admin/grade/get-all`, {
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                logger.error(`Failed to fetch grades: ${data.message}`);
                throw new Error(`Failed to fetch grades: ${data.message}`);
            }
            grades.value = data;
        } catch (e) {
            const error = e as Error;
            logger.error(`Failed to fetch grades: ${error.message}`);
            throw new Error(`Failed to fetch grades: ${error.message}`);
        }
    }

    async function fetchData() {
        await fetchAllCategories();
        await fetchAllProfessions();
        await fetchAllGrades();
    }

    fetchData();

    return {
        categories,
        professions,
        grades,
        fetchAllCategories,
        fetchAllProfessions,
        fetchAllGrades,
    };
});