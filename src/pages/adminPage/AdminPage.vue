<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import {provide, ref} from "vue";

const isAdmin = ref(false)

provide("isAdmin", isAdmin)

const toggleAdmin = () => {
  isAdmin.value = !isAdmin.value
}


</script>

<template>
  <AdminLayout>
    <template #left>
      <section class="bg-purple-800 w-full h-full">
        <button @click="toggleAdmin" >Switch Admin</button>
      </section>
    </template>
    <template #right>
      <section class="bg-purple-100 w-full h-full">

      </section>
    </template>
  </AdminLayout>
</template>