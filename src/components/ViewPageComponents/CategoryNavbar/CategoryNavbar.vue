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

<script setup lang="ts">
import { ref } from 'vue';
import CategoryNavbarElement from './CategoryNavbarElement.vue';

defineProps({
    category: String,
    modules: Array
});

const emit = defineEmits(['moduleSelected']);

const expanded = ref(false);

function toggleExpand() {
    expanded.value = !expanded.value;
}

function emitModuleSelected(module) {
    emit('moduleSelected', module);
}
</script>

<style scoped>
h2 {
    padding-left: 5px;
    font-size: 1.7rem;
    display: inline-flex;
    align-items: center;
    border-bottom: 2px solid #585858;
    cursor: pointer;
}

h2:hover {
    color: var(--active-text-color);
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
