<style scoped>
textarea::placeholder {
  height: 2rem;
  padding-top: 4rem;
}

textarea {
  height: 2rem;
}
</style>
<script setup lang="ts">

</script>

<template>
  <section class="w-full h-full text-[--text-color]">
  <!--TODO: Set margin only when 1300px or less-->
    <div class=" flex w-full justify-center items-center text-2xl h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Feladat létrehozása</span>
    </div>

    <!-- Main part of the page -->
    <div class="flex flex-col justify-center items-center mt-32 w-full">
      <div class="flex flex-wrap gap-8 w-full justify-center items-center py-8">
        <div class="relative w-full max-w-xs">
          <input
              type="text"
              placeholder="Modul címe"
              class="w-full py-2 px-2 text-[--text-color] border-none outline-none text-center bg-transparent placeholder-[--placeholder-color]"
          />
          <hr class="absolute w-full h-[3px] bg-[--underline-color] shadow-2xl top-full" />
        </div>

        <div class="relative w-full max-w-xs">
          <textarea
              placeholder="Modul leírása"
              class="w-full px-2 py-2 text-[--text-color] resize-none border-none outline-none text-center overflow-auto bg-transparent placeholder-[--placeholder-color]"
          ></textarea>
          <hr class="absolute w-full h-[3px] bg-[--underline-color] mt-[3px] shadow-2xl top-full" />
        </div>
      </div>

      <div class="flex flex-wrap justify-center items-center gap-8 w-full py-4">
        <!-- Grade Select -->
        <div class="w-full max-w-xs">
          <select
              id="grade"
              v-model="selectedGrade"
              @change="filterBasedOnSelection('grade')"
              class="block w-full mt-2 p-2 rounded-lg text-center border border-gray-300
              bg-[--button-base-color] hover:bg-[--button-hover-color] active:bg-[--button-active-color] "
          >
            <option value="" disabled hidden>Osztály</option>
            <option value="" disabled>Válasszon egy osztályt</option>
            <option
                v-for="grade in filteredGrades"
                :key="grade"
                :value="grade"
            >
              {{ grade }}
            </option>
          </select>
        </div>

        <!-- Category Select -->
        <div class="w-full max-w-xs">
          <select
              id="category"
              v-model="selectedCategory"
              @change="filterBasedOnSelection('category')"
              class="block w-full mt-2 p-2 rounded-lg text-center border border-gray-300
              bg-[--button-base-color] hover:bg-[--button-hover-color] active:bg-[--button-active-color] "
          >
            <option value="" disabled hidden>Kategória</option>
            <option value="" disabled>Válasszon egy kategóriát</option>
            <option
                v-for="category in filteredCategories"
                :key="category"
                :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Profession Select -->
        <div class="w-full max-w-xs">
          <select
              id="profession"
              v-model="selectedProfession"
              @change="filterBasedOnSelection('profession')"
              class="block w-full mt-2 p-2 rounded-lg text-center border border-gray-300
              bg-[--button-base-color] hover:bg-[--button-hover-color] active:bg-[--button-active-color] "
          >
            <option value="" disabled hidden>Szakma</option>
            <option value="" disabled>Válasszon egy szakmát</option>
            <option
                v-for="profession in filteredProfessions"
                :key="profession"
                :value="profession"
            >
              {{ profession }}
            </option>
          </select>
        </div>
      </div>

      <!-- Clear Button -->
      <div class="w-full flex justify-center items-center">
        <button
            @click="clearSelections"
            class="max-w-[14em] w-full mt-4 py-2 px-4 bg-[--button-delete-base-color] text-[--button-delete-text-color] font-semibold rounded-lg hover:bg-[--button-delete-hover-color] active:bg-[--button-delete-active-color]"
        >
          Választások törlése
        </button>
      </div>

      <div class="flex flex-wrap gap-8 justify-center items-center py-8 w-full">
        <input
            class="w-full max-w-xs text-center focus:outline-none"
            placeholder="Modul címe"
            type="file"
            accept=".md"
        >
        <button
            class="rounded-md py-1 px-6 w-full max-w-xs border border-gray-300 bg-[--button-base-color] hover:bg-[--button-hover-color] active:bg-[--button-active-color]"
        >
          Fájl szerkesztése
        </button>
      </div>

      <div class="w-full flex justify-center items-center py-8">
        <button
            class="rounded-md max-w-xs shadow w-full sm:w-auto py-2 px-6 text-center text-[--button-submit-text-color] bg-[--button-submit-base-color] hover:bg-[--button-submit-hover-color] active:bg-[--button-submit-active-color]"
        >
          Mentés
        </button>
      </div>
    </div>
  </section>

</template>