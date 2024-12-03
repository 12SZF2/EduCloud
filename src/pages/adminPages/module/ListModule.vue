<script setup lang="ts">

import {computed, ref} from "vue";

  const modules = ref('')
  const searchQuery = ref('');

  modules.value = [
   { id: 1, name: 'Express alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'Java alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'C# alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'HTML alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'CSS alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'PHP alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
   { id: 1, name: 'Random alapok', description: 'almavagyok', grade: '13', createdAt: '2024.06.25 12:00:00', categoryName: 'Backend', professionName: 'Szoftverfejleszto' },
 ];


  const filteredModules = computed(() => {
    return modules.value.filter(module =>
        module.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const tableCols = ['ID','Name','Grade','Description','Category','Profession','CreatdAt','Edit','Delete'];

</script>

<template>

  <div v-if="modules.length <= 0">
    <h1 class="form-title">Nincsenek elérhető modulok</h1>
  </div>
  <div v-if="modules.length > 0" class="search-container">
    <input v-model="searchQuery" type="text" placeholder="Keresés" class="search-input" />
  </div>
  <div v-if="modules.length > 0" class="table-container">
    <table class="category-table">
      <thead>
      <tr>
        <th v-for="content in tableCols" :key="content">{{content}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(module, index) in filteredModules" :key="index">
        <td>{{ module.id }}</td>
        <td>{{ module.name }}</td>
        <td>{{ module.grade }}</td>
        <td>{{ module.description }}</td>
        <td>{{ module.categoryName }}</td>
        <td>{{ module.professionName }}</td>
        <td>{{ module.createdAt }}</td>
        <td>
          <button @click="editModule(module.id)" class="delete-button">
            Edit
          </button>
        </td>
        <td>
          <button @click="deleteModule(module.id)" class="delete-button">
            Törlés
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>