<template>
    <div>
        <h2 @click="toggleExpand">
            {{ category }}
            <span class="expand-icon">{{ expanded ? '▲' : '▼' }}</span> <!-- Nyíl ikon -->
        </h2>
        <ul v-if="expanded" class="category-list">
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
h2 {
    font-size: 1.5rem;
    display: inline-flex;
    align-items: center;
    border-bottom: 2px solid #585858;
    cursor: pointer;
}

.expand-icon {
    margin-left: 10px;
    font-size: 1.2rem;
    transition: transform 0.2s ease;
}

.category-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: block;
}

.category-list li {
    display: block;
}
</style>
