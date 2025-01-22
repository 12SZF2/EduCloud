<script setup lang="ts">
import { ref } from 'vue';

const dateValue = ref('');
const dateInput = ref<HTMLInputElement | null>(null);

const openDatePicker = () => {
  if (dateInput.value) {
    dateInput.value.showPicker(); // Use showPicker() to open the date picker
  }
};

const handleDateChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  dateValue.value = input.value; // Update the date value
};
//kurwa mać date picker
</script>


<template>
  <section class="w-full h-full text-[--text-color]">
    <div class="flex w-full justify-center items-center text-2xl h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Felhasználó létrehozása</span>
    </div>

    <!-- Main part of the page -->
    <div class="flex flex-col justify-center items-center mt-[23vh] gap-14 w-full">

      <div class="flex flex-row gap-8 ">
        <input type="text" placeholder="Felhasználónév"
        class="bg-transparent outline-none text-center border-b border-[--underline-color] placeholder-[--placeholder-color]">
        <input type="text" placeholder="Név"
        class="bg-transparent outline-none text-center border-b border-[--underline-color] placeholder-[--placeholder-color]">
      </div>
      <div class="flex flex-row gap-8">
        <input type="text" placeholder="Email"
        class="bg-transparent outline-none text-center border-b border-[--underline-color] placeholder-[--placeholder-color]">
        <input type="password" placeholder="Jelszó"
        class="bg-transparent outline-none text-center border-b border-[--underline-color] placeholder-[--placeholder-color]">
      </div>
      <div @click="openDatePicker"
           class="flex flex-col items-center border  shadow-xl rounded-md bg-[--button-base-color] active:bg-[--button-active-color] hover:bg-[--button-hover-color]">
        <p>Születési dátum</p>
        <input type="date" ref="dateInput" @change="handleDateChange"
               class="bg-transparent outline-none text-center select-none">
        <!-- I said GG 5 times while making this |^| -->
      </div>
      <div>
        <button class="rounded-md text-[--submit-button-text-color] py-1 px-12 shadow text-center bg-[--button-submit-base-color] hover:bg-[--button-submit-hover-color] active:bg-[--button-submit-active-color]">
          Mentés
        </button>
      </div>

    </div>
  </section>

</template>