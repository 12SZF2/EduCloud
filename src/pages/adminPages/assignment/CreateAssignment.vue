<script setup lang="ts">


</script>

<template>
  <section class="w-full h-full">
    <div class="flex w-full justify-center items-center text-2xl h-[7dvh] font-bold border-b-[1px] border-b-gray-800">
      <span>Feladat létrehozása</span>
    </div>

    <!-- Main part of the page -->
    <div class="flex flex-col justify-center align-middle mt-[23vh] w-full">

      <div class="flex justify-center items-center">
        <p>Töltsön fel egy markdown file-t, vagy hozzon létre itt helyben.</p>
      </div>
      <div class="flex gap-44 justify-center align-middle py-8 ">
        <input class="border-b text-center focus:outline-none" placeholder="Modul címe" type="file" accept=".md,.anyad">
        <button class="rounded-md py-1 border border-gray-300  px-12 text-center bg-gray-800 hover:bg-gray-600 active:bg-gray-800" >Fájl szerkesztése</button>
      </div>

      <div class="flex gap-44  justify-center align-middle py-8" >
        <button
            class="rounded-md py-1 px-12 border border-gray-300 text-center bg-gray-800 hover:bg-gray-600 active:bg-gray-800"
        >Mentés</button>
      </div>

    </div>
  </section>

</template>