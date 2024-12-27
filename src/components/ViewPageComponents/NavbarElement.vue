<template>
    <li @click="navigate">{{ title }}</li>
</template>

<script>
export default {
    props: ["title", "route"],
    methods: {
        navigate() {
            this.$router.push(this.route);
        },
    },
};
</script>

<style>
/* Add your styles here */
</style>