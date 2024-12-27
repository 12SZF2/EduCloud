<template>
    <footer>
        <p>Published on: {{ publishedDate }}</p>
        <p>Last updated: {{ updatedDate }}</p>
    </footer>
</template>

<script>
export default {
    props: ["publishedDate", "updatedDate"],
};
</script>

<style>
/* Add your styles here */
</style>