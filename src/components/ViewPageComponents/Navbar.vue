<template>
    <nav>
        <button @click="goBack">Back</button>
        <input type="text" placeholder="Search" v-model="searchQuery" />
        <user-icon />
    </nav>
</template>

<script>
import UserIcon from "../userIconComponents/UserIcon.vue";
export default {
    components: { UserIcon },
    data() {
        return { searchQuery: "" };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
/* Add your styles here */
</style>