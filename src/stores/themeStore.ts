import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        currentTheme: localStorage.getItem('theme') || 'Light',
        themes: ['Light', 'Dark', 'Light-Western', 'Dark-Western'],
    }),
    actions: {
        setTheme(theme: string) {
            if (this.themes.includes(theme)) {
                this.currentTheme = theme;
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }
        },
    },
});
