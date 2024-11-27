<script setup lang="ts">
import {inject, ref} from "vue";

const isAdmin = inject("isAdmin")

const showModulesDropdown = ref(false);
const showAssignmentsDropdown = ref(false);
const showUsersDropdown = ref(false);

</script>

<template>

  <section>
    <div class="flex flex-col py-[1.5dvh] sm:text-xl md:text-1xl">
      <!-- Modules Dropdown -->
      <div class="">
        <button
            @click="showModulesDropdown = !showModulesDropdown"
            class="w-full px-4 py-2 text-left  rounded flex justify-between items-center"
        >
          Modulok
          <i v-if="showModulesDropdown" class="pi pi-angle-up text-base" />
          <i v-else class="pi pi-angle-down text-base" />
        </button>
        <div
            v-if="showModulesDropdown"
            class="mt-2 space-y-1 text-gray-800 shadow rounded-lg"
        >
          <RouterLink
              to="/admin/modules-create"
              class="block px-4 py-2 "
              @click.native="showModulesDropdown = false"
          >
            Létrehozás
          </RouterLink>
          <RouterLink
              to="/admin/modules-list"
              class="block px-4 py-2 "
              @click.native="showModulesDropdown = false"
          >
            Listázás
          </RouterLink>
        </div>
      </div>

      <!-- Assignments Dropdown -->
      <div class="border-b border-gray-300">
        <button
            @click="showAssignmentsDropdown = !showAssignmentsDropdown"
            class="w-full px-4 py-2 text-left  flex justify-between items-center"
        >
          Feladatok
          <i v-if="showAssignmentsDropdown" class="pi pi-angle-up text-base" />
          <i v-else class="pi pi-angle-down text-base" />
        </button>
        <div
            v-if="showAssignmentsDropdown"
            class="mt-2 space-y-1 bg-white text-gray-800 shadow rounded-lg"
        >
          <RouterLink
              to="/admin/assignments-create"
              class="block px-4 py-2 "
              @click.native="showAssignmentsDropdown = false"
          >
            Létrehozás
          </RouterLink>
          <RouterLink
              to="/admin/assignments-list"
              class="block px-4 py-2 "
              @click.native="showAssignmentsDropdown = false"
          >
            Listázás
          </RouterLink>
        </div>
      </div>

      <!-- Users Dropdown (only if isAdmin is true) -->
      <div v-if="isAdmin" >
        <button
            @click="showUsersDropdown = !showUsersDropdown"
            class="w-full px-4 py-2 text-left  flex justify-between items-center"
        >
          Felhasználók
          <i v-if="showUsersDropdown" class="pi pi-angle-up text-base" />
          <i v-else class="pi pi-angle-down text-base" />
        </button>
        <div
            v-if="showUsersDropdown"
            class="mt-2 space-y-1 bg-white text-gray-800 shadow rounded-lg"
        >
          <RouterLink
              to="/admin/users-create"
              class="block px-4 py-2 text-gray-800"
              @click.native="showUsersDropdown = false"
          >
            Létrehozás
          </RouterLink>
          <RouterLink
              to="/admin/users-list"
              class="block px-4 py-2 text-gray-800"
              @click.native="showUsersDropdown = false"
          >
            Listázás
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

</template>