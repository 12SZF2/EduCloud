<script setup lang="ts">

import {computed, ref} from "vue";

const users = ref('')

users.value = [
  { id: 1, name: 'John Doe', registryDate: '2023-01-15', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', registryDate: '2023-02-20', email: 'jane.smith@example.com' },
  { id: 3, name: 'Alice Johnson', registryDate: '2023-03-10', email: 'alice.johnson@example.com' },
  { id: 4, name: 'Bob Brown', registryDate: '2023-04-05', email: 'bob.brown@example.com' },
  { id: 5, name: 'Charlie Davis', registryDate: '2023-05-25', email: 'charlie.davis@example.com' },
  { id: 6, name: 'Diana Evans', registryDate: '2023-06-30', email: 'diana.evans@example.com' },
  { id: 7, name: 'Ethan Harris', registryDate: '2023-07-15', email: 'ethan.harris@example.com' },
  { id: 8, name: 'Fiona Clark', registryDate: '2023-08-20', email: 'fiona.clark@example.com' },
  { id: 9, name: 'George Lewis', registryDate: '2023-09-10', email: 'george.lewis@example.com' },
  { id: 10, name: 'Hannah Walker', registryDate: '2023-10-05', email: 'hannah.walker@example.com' }
];
const nameSearchQuery = ref('');

const filteredUsersByName = computed(() => {
  return users.value.filter(users =>
      users.name.toLowerCase().includes(nameSearchQuery.value.toLowerCase())
  );
});

//delete function
function deleteUser(id: number) {
  users.value.map((value:any, index)=>{
    if(id == value.id) {
      users.value.splice(index, 1)
    }
  })
}

const tableCols = ['Név','Regisztráció Ideje','Email Cím','Módosítás','Törlés'];


</script>

<template>
  <section class="w-full h-full flex flex-col items-center">

    <div class="flex w-full justify-center items-center text-xl lg:text-2xl h-[3em] font-bold border-b border-[--border-color]">
      <span>Felhasználók</span>
    </div>

    <div class="mt-8 w-full px-4 flex flex-col items-center">

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