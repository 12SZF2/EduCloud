<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {string} from "postcss-selector-parser";

const router = useRouter()
const route = useRoute()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen text-center text-[--text-color]">
    <h1 class="text-6xl">404</h1>
    <div class="flex flex-col justify-center items-center">
      <p>Az oldal:</p>
      <p>{{route.path.substring(1)}}</p>
      <p>nem található</p>
    </div>

    <button @click="goBack"
            class="font-bold py-2 px-4 text-[--text-color] hover:text-[--button-hover-color]">
      Előző oldal
    </button>

    <router-link to="/">
      <button class="font-bold py-2 px-4 text-[--text-color] hover:text-[--button-hover-color]">
        Kezdőlap
      </button>
    </router-link>

  </div>
</template>