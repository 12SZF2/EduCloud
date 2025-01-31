<template>
  <div class="relative" ref="userIcon" @click.stop="toggleDropdown">
    <SvgIcon type="mdi" :path="mdiAccountOutline" class="w-12 h-12 text-[var(--text-color)] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" />
    <div v-if="isDropdownVisible" class="absolute bg-[var(--background-color)] text-white p-2 rounded-lg flex flex-col z-50" :style="dropdownPosition">
      <div class="flex items-center gap-4 p-1 w-44 h-8 text-lg rounded-lg text-[var(--text-color)] cursor-pointer hover:bg-white hover:bg-opacity-10" @click="admin">
        <SvgIcon type="mdi" :path="mdiSecurity" />
        <p>Admin</p>
      </div>
      <div class="flex items-center gap-4 p-1 w-44 h-8 text-lg rounded-lg text-[var(--text-color)] cursor-pointer hover:bg-white hover:bg-opacity-10" @click="logout">
        <SvgIcon type="mdi" :path="mdiLogout" />
        <p @click.once="() => {
          Cookies.remove('access_token');
        }">Logout</p>
      </div>
      <ThemeMenu class="flex items-center gap-4 p-1 w-44 h-8 text-lg rounded-lg text-[var(--text-color)] cursor-pointer hover:bg-white hover:bg-opacity-10" @click.stop />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import ThemeMenu from '@/components/themeChangerComponents/ThemeMenu.vue';
import { mdiAccountOutline, mdiSecurity, mdiLogout } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {emit} from "@/utils/eventBus.util";
import Cookies from "js-cookie";

const isDropdownVisible = ref(false);
const userIcon = ref<HTMLElement | null>(null);
const dropdownPosition = ref<{ top: string, left: string }>({ top: '0px', left: '0px' });


const emitValue = () => {
  emit('value', isDropdownVisible.value);
};


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

      dropdownPosition.value = {
        top: `${iconRect.bottom + window.scrollY}px`,
        left: `${-149}px`,
      };

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
