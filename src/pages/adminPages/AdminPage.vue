<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import {provide, ref} from "vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";
import {useRouter} from "vue-router";

const isAdmin = ref(false)

provide("isAdmin", isAdmin)

const toggleAdmin = () => {
  isAdmin.value = !isAdmin.value
}

const router = useRouter()

const goBack = () => {
  router.go(-1)
}


</script>

<template>
  <AdminLayout>
    <template #left>
      <section class=" w-full h-full">
        <div class="px-7 py-3 flex justify-between">
          <button class="text-4xl" @click="goBack">←</button>
          <button @click="toggleAdmin" >Switch Admin</button>
          <img src="/src/public/images/User.png" alt="fekete" class="size-10">
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