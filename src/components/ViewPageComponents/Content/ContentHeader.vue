<template>
    <header>
        <h1>{{ title }}</h1>
        <h2>{{ category }}</h2>
    </header>
</template>

<script>
export default {
    props: ["title", "category"],
};
</script>

<style></style>