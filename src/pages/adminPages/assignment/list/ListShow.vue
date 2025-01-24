<template>
  <div v-if="selectedItem" class="mt-6 text-[--text-color]">
    <h2 class="text-xl font-bold">Modul tartalma</h2>

    <!-- Table displaying the selected item's properties -->
    <div class="rounded-md bg-gray-800">

      <table class="w-full min-w-[30dvw] border-black border-solid  text-center">
        <thead>
        <tr class="text-[--table-text-color]">
          <th class="px-4 ">Név</th>
          <th class="px-4 border-black">File</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in selectedItem.items" :key="index" class="odd:bg-[--table-tr-color-odd] even:bg-[--table-tr-color-even]">
          <td>
            {{ item.name }}
          </td>
          <td>
            <button class="text-[--text-link-color] hover:text-[--text-link-hover-color] active:text-gray-800"><!-- Handle File opening -->
            {{ item.fileName }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="flex justify-center">
      <p class="text-[--text-color]">A megnyitáshoz kattintson a fálj nevére.</p>
    </div>
  </div>
  <div v-else>
    <p class="text-[--text-color]">Kattintson az egyik modulra a továbbiakhoz.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the prop the child will receive
const props = defineProps({
  selectedItem: Object,
});
</script>