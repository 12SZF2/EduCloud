<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const goBack = () => {
  router.go(-1)
}


</script>

<template>
  <AdminLayout>
    <template #left>
      <section class=" w-full h-full border-r-[1px] border-r-gray-800">
        <div class="w-full h-[7dvh] flex justify-between px-4 flex-nowrap gap-[7rem]">
          <button class="text-4xl" @click="goBack">←</button>
          <img src="/src/public/images/User.png" alt="fekete" class="size-12 my-3">
        </div>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="w-full h-full">
        <router-view/>
      </section>
    </template>
  </AdminLayout>
</template>