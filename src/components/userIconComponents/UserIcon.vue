<template>
    <div class="user-icon" ref="userIcon" @click.stop="toggleDropdown">
        <SvgIcon type="mdi" :path="mdiAccountOutline" class="icon" />
        <div v-if="isDropdownVisible" class="dropdown-menu" :style="dropdownPosition">
            <div class="dropdown-item" @click="admin">
                <SvgIcon type="mdi" :path="mdiSecurity" />
                <p>Admin</p>
            </div>
            <div class="dropdown-item" @click="logout">
                <SvgIcon type="mdi" :path="mdiLogout" />
                <p @click.once="() => {
                      Cookies.remove('access_token');
                    }">Kijelentkezés</p>
            </div>
            <!-- Add click.stop here -->
            <ThemeMenu class="dropdown-item" @click.stop />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import ThemeMenu from '@/components/themeChangerComponents/ThemeMenu.vue';
import { mdiAccountOutline, mdiSecurity, mdiLogout } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import Cookies from "js-cookie";

const isDropdownVisible = ref(false);
const userIcon = ref<HTMLElement | null>(null);
const dropdownPosition = ref<{ top: string, left: string }>({ top: '0px', left: '0px' });

function toggleDropdown() {
    isDropdownVisible.value = !isDropdownVisible.value;
    updateDropdownPosition();
}

function closeDropdown() {
    isDropdownVisible.value = false;
}

function admin() {
    alert("admin");
}

function logout() {
    alert("logout");
}

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.currentTheme);

function updateDropdownPosition() {
    if (isDropdownVisible.value && userIcon.value) {
        const iconRect = userIcon.value.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const dropdownWidth = 190;
        const leftSpace = iconRect.left;
        const rightSpace = screenWidth - (iconRect.left + iconRect.width);

        if (window.outerWidth <= 500) {
            dropdownPosition.value = {
                top: `${iconRect.bottom + window.scrollY}px`,
                left: `${(screenWidth - (0.8 * screenWidth)) / 2}px`,
            };
        } else {
            if (leftSpace < 0.5 * screenWidth) {
                dropdownPosition.value = {
                    top: `${iconRect.bottom + window.scrollY}px`,
                    left: `${iconRect.left}px`,
                };
            } else if (rightSpace < 0.5 * screenWidth) {
                dropdownPosition.value = {
                    top: `${iconRect.bottom + window.scrollY}px`,
                    left: `${iconRect.left + iconRect.width - dropdownWidth - 25}px`,
                };
            } else {
                dropdownPosition.value = {
                    top: `${iconRect.bottom + window.scrollY}px`,
                    left: `${iconRect.left + window.scrollX}px`,
                };
            }
        }
    }
}

function handleOutsideClick(event: MouseEvent) {
    if (userIcon.value && !userIcon.value.contains(event.target as Node)) {
        closeDropdown();
    }
}

onMounted(() => {
    window.addEventListener('resize', updateDropdownPosition);
    document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateDropdownPosition);
    document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.user-icon {
    border-radius: 15px;
    width: 50px;
    height: 50px;
    color: var(--text-color);
    cursor: pointer;
}

.icon {
    border-radius: 15px;
    width: 50px;
    height: 50px;
    color: var(--text-color);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
}

.dropdown-menu {
    position: absolute;
    background-color: var(--background-color);
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 5px;
    width: 180px;
    height: 30px;
    font-size: 1.2rem;
    border-radius: 5px;
    color: var(--text-color);
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
}

@media (max-width: 500px) {
    .dropdown-menu {
        width: 70vw;
    }

    .dropdown-item {
        width: 65vw;
        font-size: 0.9rem;
    }
}
</style>
