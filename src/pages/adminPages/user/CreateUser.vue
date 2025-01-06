<script setup lang="ts">


</script>

<template>
  <section class="w-full h-full text-[--text-color]">
    <div class="flex w-full justify-center items-center text-2xl h-[7dvh] font-bold border-b-[1px] border-[--border-color]">
      <span>Felhasználó létrehozása</span>
    </div>

    <!-- Main part of the page -->
    <div class="flex flex-col justify-center items-center mt-[23vh] gap-14 w-full">

      <div class="flex flex-row gap-8 ">
        <input type="text" placeholder="Felhasználónév"
        class="bg-transparent outline-none text-center">
        <input type="text" placeholder="Név"
        class="bg-transparent outline-none text-center">
      </div>
      <div class="flex flex-row gap-8">
        <input type="text" placeholder="Email"
        class=" bg-transparent outline-none  text-center">
        <input type="text" placeholder="Jelszó"
        class=" bg-transparent outline-none text-center">
      </div>
      <input
          type="text"
          placeholder="Modul címe"
          class="w-full py-2 px-2 text-[--text-color] border-none outline-none focus:ring-0 text-center bg-transparent placeholder-[--placeholder-color]"
      />

    </div>
  </section>

</template>