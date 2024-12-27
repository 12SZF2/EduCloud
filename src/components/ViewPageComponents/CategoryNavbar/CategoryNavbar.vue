<template>
    <div>
        <h2 @click="toggleExpand">{{ category }}</h2>
        <ul v-if="expanded">
            <category-navbar-element v-for="module in modules" :key="module.id" :title="module.name" :module="module"
                @moduleSelected="emitModuleSelected" />
        </ul>
    </div>
</template>

<script>
import CategoryNavbarElement from "./CategoryNavbarElement.vue";
export default {
    components: { CategoryNavbarElement },
    props: ["category", "modules"],
    data() {
        return { expanded: false };
    },
    methods: {
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        emitModuleSelected(module) {
            this.$emit("moduleSelected", module);
        },
    },
};
</script>

<style>
/* Add your styles here */
</style>