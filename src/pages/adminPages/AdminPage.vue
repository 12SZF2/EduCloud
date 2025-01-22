<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";
import {useRoute, useRouter} from "vue-router";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import UserIcon from "@/components/userIconComponents/UserIcon.vue";

const router = useRouter()



const goBack = () => {
  router.back()
}


</script>

<template>
  <AdminLayout class="text-[--text-color]">
    <template #left>
      <section class=" w-full h-full border-r-[1px] border-[--border-color] ">
                     <!-- pixel perfect or not?-->
        <div class="w-full h-[4.44em] flex flex-row items-center justify-between px-4 flex-nowrap gap-[3em]">
          <RouterLink to="/">
            <FontAwesomeIcon class="text-4xl hover:invert" :icon="faHouse" />
          </RouterLink>
          <!-- user icon -->
          <UserIcon/>
        </div>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="w-full h-full ">
        <router-view/>
      </section>
    </template>
  </AdminLayout>
</template>