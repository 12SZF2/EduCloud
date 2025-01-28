<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";

const store = useUserStore();

const users = ref('')

const nameSearchQuery = ref('');

const filteredUsersByName = computed(() => {
  return users.value.filter(users =>
      users.name.toLowerCase().includes(nameSearchQuery.value.toLowerCase())
  );
});

//delete function
async function deleteUser(id: string) {
  await store.deleteUserById(id)
  users.value.map((value:any, index)=>{
    if(id == value.id) {
      users.value.splice(index, 1)
    }
  })
}

const tableCols = ['Név','Regisztráció Ideje','Email Cím','Módosítás','Törlés'];

onMounted(async () => {
  try {
    users.value = await store.fetchAllUsers();
  } catch (e) {
    console.error(e);
  }
});

</script>

<template>
  <section class="w-full h-full flex flex-col items-center">

    <div class="flex w-full justify-center items-center text-xl lg:text-2xl h-[3em] font-bold border-b border-[--border-color]">
      <span>Felhasználók</span>
    </div>

    <div class="mt-2 w-full px-4 flex flex-col items-center">

      <!-- Search -->
      <div v-if="users.length > 0" class="my-8 w-full max-w-md flex justify-center ">
        <input
            v-model="nameSearchQuery"
            type="text"
            placeholder="Keresés"
            class="w-[40dvw] lg:w-[20dvw] bg-transparent placeholder-gray-800 text-center border-b border-[--border-color] focus:outline-none"
        />🔍
      </div>

<!-- Users Table -->
      <div v-if="users.length > 0" class="w-full max-w-[80dvw] lg:max-w-[60dvw] overflow-x-auto rounded-md bg-[--table-bg-color]">
        <table class="table-auto w-full text-center">
          <thead>
          <tr class="bg-[--table-bg-color] text-[--table-text-color]">
            <th v-for="content in tableCols" :key="content" class="px-4 py-1">
              {{ content }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(user, index) in filteredUsersByName"
              :key="index"
              class="odd:bg-[--table-tr-color-odd] even:bg-[--table-tr-color-even]"
          >

            <td class="px-4 py-1">{{ user.name }}</td>
            <td class="px-4 py-1">{{ user.registryDate }}</td>
            <td class="px-4 py-1">{{ user.email }}</td>
            <td class="px-4 py-1">
              <button
                  class="bg-blue-600 hover:bg-blue-500 text-[--text-color] py-1 px-4 rounded"
              >
                ✎
              </button>
            </td>
            <td class="px-4 py-1">
              <button
                  @click="deleteUser(user.id)"
                  class="bg-red-600 hover:bg-red-500 text-[--text-color] px-4 rounded"
              >
                <span class="text-2xl">
                  🗑
                </span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- No Users Message -->
      <div v-if="users.length <= 0">
        <h1 class="text-lg font-semibold text-gray-700">Nincsenek elérhető felhasználók</h1>
      </div>
    </div>
  </section>

</template>