<script setup>
import { ref } from "vue";

const inputValues = ref(["", "", ""]);

const inputValuesSum = ref("");

const categoryCreateValues = ["Évfolyam", "Kategória", "Szakma"];
</script>

<template>
  <section class="w-full h-full">
    <!-- Header -->
    <div class="flex w-full justify-center items-center text-2xl h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Modul kategória létrehozása</span>
    </div>

    <div class="flex flex-col justify-center items-center mt-[15vh] sm:mt-[20vh] w-full">
      <!-- Input Fields -->
      <div class="flex flex-wrap gap-4 justify-center items-center p-8 w-full">
        <div v-for="(value, index) in inputValues" :key="index" class="relative w-full sm:w-auto max-w-md">
          <input
              v-model="inputValues[index]"
              type="text"
              :placeholder="`${categoryCreateValues[index]}`"
              class="w-full py-2 px-4 text-[--text-color] placeholder-gray-800 border-none outline-none focus:ring-0 text-center bg-transparent"
          />
          <hr class="absolute w-full h-[2px] bg-[--underline-color] shadow-2xl top-full" />
        </div>
      </div>

      <!-- Clear Button -->
      <div class="w-full flex justify-center items-center">
        <button
            @click="inputValues.fill('')"
            class="w-full max-w-[80dvw] lg:max-w-[20dvw] py-2 px-6 bg-[--button-delete-base-color] text-[--button-delete-text-color] font-semibold rounded-lg hover:bg-[--button-delete-hover-color] active:bg-[--button-delete-active-color]"
        >
          Válaszok törlése
        </button>
      </div>

      <!-- Save Section -->
      <div class="flex flex-col items-center py-8">
        <button
            @click="inputValuesSum = inputValues.join(', ')"
            class="rounded-md w-full shadow sm:w-auto py-2 px-6 text-center bg-[--button-submit-base-color] hover:bg-[--button-submit-hover-color] active:bg-[--button-submit-active-color] text-[--button-submit-text-color]"
        >
          Mentés
        </button>
        <p class="text-center mt-4 text-sm sm:text-base text-gray-400">{{ inputValuesSum }}</p>
      </div>
    </div>
  </section>
</template>
