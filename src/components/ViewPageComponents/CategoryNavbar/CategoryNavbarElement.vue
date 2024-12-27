<template>
    <li @click="selectModule">{{ title }}</li>
</template>

<script>
export default {
    props: ["title", "module"],
    methods: {
        selectModule() {
            this.$emit("moduleSelected", this.module);
        },
    },
};
</script>

<style>
/* Add your styles here */
</style>