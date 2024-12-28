<template>
    <li @click="selectModule">
        <span class="list-dot"></span> {{ title }}
    </li>
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
li {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-size: 1.4rem;
    padding-left: 10px;
}

li:hover {
    color: var(--active-text-color);
}

.list-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background-color: var(--text-color);
    border-radius: 50%;
}
</style>