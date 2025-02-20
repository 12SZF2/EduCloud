<template>
  <header>
    <h1 v-if="isLargeScreen">{{ category }}</h1>
    <SvgIcon v-else type="mdi" :path="mdiMenu" class="icon" @click="emitTogglePopup" />
    <h1>{{ title }}</h1>
    <SvgIcon type="mdi" :path="iconPath" class="icon edit" @click="openEditPopup" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { mdiPencilOutline, mdiMenu } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { on, emit } from "@/utils/eventBus.util";

import { useCookies } from 'vue3-cookies';
import { jwtDecode } from 'jwt-decode';

const isAdmin = ref(false)
const { cookies } = useCookies();

const isJwtValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    return decoded && decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const checkRole = () => {
  const jwtToken = cookies.get('access_token');
  isAdmin.value = isJwtValid(jwtToken);
};

const hideEdit = () => {
  checkRole();
  const icons = document.querySelectorAll<HTMLButtonElement>('.edit');

  icons.forEach(icon => {
    if (!isAdmin.value) {
      icon.style.opacity = '0';
      icon.style.cursor = 'default';
      icon.disabled = true;
    } else {
      icon.style.opacity = '1';
      icon.style.cursor = 'pointer';
      icon.disabled = false;
    }
  });
}

const iconPath = ref(mdiPencilOutline);
const isLargeScreen = ref(window.innerWidth >= 1300);

defineProps({
  title: String,
  category: String
});

function emitTogglePopup() {
  emit('openPopup');
}

function openEditPopup() {
  emit('editContent');
  console.log('Edit popup opened');
}

function handleResize() {
  isLargeScreen.value = window.innerWidth >= 1300;
}

onMounted(() => {
  hideEdit()
  window.addEventListener('resize', handleResize);
  on('removezindex', () => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      (icon as HTMLElement).style.zIndex = '0';
    });
  });
  on('addzindex', () => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      (icon as HTMLElement).style.zIndex = '10';
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.edit {
  opacity: 100;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

h1 {
  font-size: clamp(1rem, 5vw, 2rem);
  flex-shrink: 0;
  margin: 0;
}

.icon {
  border-radius: 15px;
  width: 50px;
  height: 50px;
  color: var(--text-color);
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  z-index: 100;
}

.icon:hover {
  transform: scale(1.2);
}

@media (max-width: 500px) {
  .icon {
    width: 30px;
    height: 30px;
  }
}

@media (max-height: 500px) {
  header {
    padding-bottom: 25px;
  }
}
</style>
