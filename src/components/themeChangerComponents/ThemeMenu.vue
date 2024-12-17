<template>
    <div class="theme-menu">

        <div class="header" @click="toggleMenu">
            <SvgIcon type="mdi" :path="mdiPalette" class="icon" />
            <p>Themes</p>
        </div>

        <div v-if="menuVisible" class="overlay" @click.self="menuVisible = false">
            <Transition name="fade-slide">
                <div v-if="menuVisible" class="menu-container" @click.stop>
                    <div v-for="theme in themes" :key="theme" @click="changeTheme(theme)" class="theme-option"
                        :class="{ selected: theme === currentTheme }">
                        <img :src="getThemeImage(theme)" :alt="`${theme} theme`" />
                        <span>{{ theme }}</span>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "@/stores/themeStore";
import { mdiPalette } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

const themeStore = useThemeStore();
const themes = computed(() => themeStore.themes);
const currentTheme = computed(() => themeStore.currentTheme);
const menuVisible = ref(false);

const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
};

const changeTheme = (theme: string) => {
    themeStore.setTheme(theme);
    menuVisible.value = false;
};

const getThemeImage = (theme: string): string => {
    return new URL(`../../assets/${theme}.jpg`, import.meta.url).href;
};

onMounted(() => {
    if (!themeStore.currentTheme || !themeStore.themes.includes(themeStore.currentTheme)) {
        themeStore.setTheme("light");
    }
});
</script>

<style scoped>
.theme-menu {
    position: relative;
}

.icon-button {
    background: none;
    border: none;
    color: inherit;
}

.header {
    display: flex;
    align-items: center;
    color: var(--text-color);
    cursor: pointer;
    gap: 1rem;
    font-size: 1.2rem;
    border-radius: 5px;
    width: 100%;
    height: 100%;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-container {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;

    max-width: 90%;
    max-height: 80%;
    overflow-y: auto;
    scrollbar-width: none;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    width: 450px;
}

.theme-option {
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 1rem;
    transition: border 0.3s, transform 0.3s;
    gap: 10px;

    &:hover {
        transform: scale(1.05);
        border-color: var(--border-color);
    }
}

.theme-option img {
    width: 100px;
    height: 70px;
    border-radius: 8px;
    margin-bottom: 0.5rem;
}

.theme-option.selected {
    border: 2px solid var(--selected-theme-border-color);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 500px) {
    .menu-container {
        width: 70%;
        padding: 1rem;
        grid-template-columns: 1fr;
        gap: 1rem;
        max-height: 70%;
    }

    .theme-option {
        padding: 0.5rem;
    }

    .theme-option img {
        width: 80px;
        height: 50px;
    }

    .header {
        font-size: 0.9rem;
    }
}
</style>
