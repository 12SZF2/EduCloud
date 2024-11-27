<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import {provide, ref} from "vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";

const isAdmin = ref(false)

provide("isAdmin", isAdmin)

const toggleAdmin = () => {
  isAdmin.value = !isAdmin.value
}


</script>

<template>
  <AdminLayout>
    <template #left>
      <section class=" w-full h-full">
        <button @click="toggleAdmin" >Switch Admin</button>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="bg-purple-100 w-full h-full">
        <router-view/>
      </section>
    </template>
  </AdminLayout>
</template>