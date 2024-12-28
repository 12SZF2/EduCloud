<template>
  <header>
    <h1>{{ category }}</h1>
    <h1>{{ title }}</h1>
    <SvgIcon type="mdi" :path="iconPath" class="icon" @click="openEditPopup"/>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {mdiPencilOutline} from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import {emit} from "@/utils/eventBus.util";

const iconPath = ref(mdiPencilOutline);

defineProps({
  title: String,
  category: String
});

function openEditPopup() {
  emit('editContent');
  console.log('Edit popup opened');
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #585858;
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
