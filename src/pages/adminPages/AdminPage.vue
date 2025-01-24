<script setup lang="ts">


import AdminLayout from "../../slots/AdminLayout.vue";
import AdminNavbar from "../../components/adminComponents/AdminNavbar.vue";
import {useRoute, useRouter} from "vue-router";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import UserIcon from "@/components/userIconComponents/UserIcon.vue";
import AdminMobileNavbar from "@/components/adminComponents/AdminMobileNavbar.vue";
import AdminUserIcon from "@/components/adminComponents/AdminUserIcon.vue";
import {onMounted, onUnmounted, ref} from "vue";


const router = useRouter()

const isLargeScreen = ref(window.innerWidth >= 1300);

const goBack = () => {
  router.back();
};

function handleResize() {
  isLargeScreen.value = window.innerWidth >= 1300;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});



</script>

<template>
  <AdminLayout class="text-[--text-color]">
    <template #left>
      <section class="w-full h-full border-r-[1px] border-[--border-color]">
        <div class="w-full h-[4.44em] flex flex-row items-center justify-between px-4 flex-nowrap gap-[3em]">
          <RouterLink to="/">
            <FontAwesomeIcon class="text-4xl hover:invert" :icon="faHouse" />
          </RouterLink>
          <UserIcon/>
        </div>
        <AdminNavbar/>
      </section>
    </template>
    <template #right>
      <section class="w-full h-full relative">
        <div v-if="!isLargeScreen" class="absolute top-[1.1em] left-2">
          <AdminMobileNavbar/>
        </div>
        <div v-if="!isLargeScreen" class="absolute top-[0.7em] right-2">
          <AdminUserIcon/>
        </div>
        <router-view/>
      </section>
    </template>
  </AdminLayout>
</template>