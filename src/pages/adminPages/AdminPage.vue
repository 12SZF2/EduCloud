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
  <AdminLayout class="text-[--text-color]">
    <template #left>
      <section class=" w-full h-full border-r-[1px] border-[--border-color] ">
                     <!-- pixel perfect  or not?-->
        <div class="w-full h-[4.44em] flex justify-between px-4 flex-nowrap gap-[3em]">
          <button class="text-4xl" @click="goBack">←</button>
          <!-- user icon -->
        </div>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="w-full">
        <section v-if="route.path === '/admin' || route.path === '/admin/'" class="h-full">
          <div class="flex w-full justify-center items-center text-2xl h-[7.5dvh] font-bold border-b-[1px] border-[--border-color]">
            <span>Admin felület</span>
          </div>
          <div class="h-full w-full pb-56 flex justify-center items-center">
            <p>Válasszon egy felületet a navigációból.</p>
          </div>
        </section>
        <section v-else class="w-full h-full ">
          <router-view/>
        </section>
      </section>
    </template>
  </AdminLayout>
</template>