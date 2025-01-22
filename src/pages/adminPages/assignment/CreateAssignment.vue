<script setup lang="ts">


</script>

<template>
  <section class="w-full h-full text-[--text-color]">
    <div class="flex w-full justify-center items-center text-2xl h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Feladat létrehozása</span>
    </div>

    <!-- Main part of the page -->
    <div class="flex flex-col justify-center align-middle mt-[23vh] w-full">

      <div class="flex justify-center items-center">
        <p>Töltsön fel egy markdown file-t, vagy hozzon létre itt helyben.</p>
      </div>

      <div class="flex flex-row gap-28 justify-center">

        <div class="flex gap-44 justify-center align-middle py-8 ">
          <input class="text-center focus:outline-none" placeholder="Modul címe" type="file" accept=".md">
        </div>

        <div class="flex gap-44 justify-center align-middle py-8 ">
          <button class="rounded-md py-1 border border-gray-300 px-12 text-center bg-[--button-base-color] hover:bg-[--button-hover-color] active:bg-[--button-active-color]">Fájl szerkesztése</button>
        </div>

        <div class="flex gap-44  justify-center align-middle py-8" >
          <button
              class="rounded-md py-1 px-12 shadow text-center bg-[--button-submit-base-color] hover:bg-[--button-submit-hover-color] active:bg-[--button-submit-active-color]"
          >Mentés</button>
        </div>

      </div>

      </div>
  </section>

</template>