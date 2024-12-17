<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()

const route = useRoute()

const goBack = () => {
  router.go(-1)
}


</script>

<template>
  <AdminLayout class="text-white">
    <template #left>
      <section class=" w-full h-full border-r-[1px] border-r-white">
        <div class="w-full h-[7dvh] flex justify-between px-4 flex-nowrap gap-[7rem]">
          <button class="text-4xl" @click="goBack">←</button>
          <img src="/src/public/images/person-circle.svg" alt="fekete" class="size-12 my-3 invert">
        </div>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="w-full h-full">
        <section v-if="route.path === '/admin'" class="h-full">
          <div class="flex w-full justify-center items-center text-2xl h-[7dvh] font-bold border-b-[1px] border-b-white">
            <span>Admin felület</span>
          </div>
          <div class="h-full w-full pb-56 flex justify-center items-center">
            <p>Válasszon egy felületet a navigációból.</p>
          </div>
        </section>
        <section v-else class="w-full h-full">
          <router-view/>
        </section>
      </section>
    </template>
  </AdminLayout>
</template>