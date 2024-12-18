<script setup>

</script>

<template>
  <div class="flex h-[100dvh] w-[100dvw] text-[--text-color]">

    <div class="w-[22dvw] h-full border-r border-[--border-color] overflow-hidden">
      <slot name="left"/>
    </div>

    <div class="w-[78dvw] h-full overflow-auto">
      <slot name="right"/>
    </div>
  </div>

</template>