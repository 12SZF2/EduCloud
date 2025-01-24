<script setup>
  document.title = "EduCloud | Admin";

  import {ref, onMounted, onUnmounted} from 'vue';

  const isLargeScreen = ref(window.innerWidth >= 1300);

  function handleResize() {
  isLargeScreen.value = window.innerWidth >= 1300;
}

  onMounted(() => {
  window.addEventListener('resize', handleResize);
});

  onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="flex h-[100dvh] w-[100dvw] text-[--text-color] backdrop-blur-[30px] select-none">
    <div v-if="isLargeScreen" class="w-[22dvw] h-full border-r border-[--border-color] overflow-hidden">
      <slot name="left"/>
    </div>
    <div :class="isLargeScreen ? 'w-[78dvw]' : 'w-full'" class="h-full overflow-auto">
      <slot name="right"/>
    </div>
  </div>
</template>