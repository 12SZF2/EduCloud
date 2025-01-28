<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import ListShow from "./list/ListShow.vue";
import {useAssignmentStore} from "@/stores/assignment";
import {usePopupStore} from "@/stores/popup";

const assignments = ref('')

const store = useAssignmentStore();
const popupStore = usePopupStore();


const nameSearchQuery = ref('');

const filteredAssignmentsByName = computed(() => {
  return assignments.value.filter(assignment =>
      assignment.name.toLowerCase().includes(nameSearchQuery.value.toLowerCase())
  );
});

//delete function
async function deleteAssignment(id: string) {
  await store.deleteAssignmentById(id)
  assignments.value.map((value:any, index)=>{
    if(id == value.id) {
      assignments.value.splice(index, 1)
    }
  })
}
// Define a reactive property to store the selected item
const selectedItem = ref(null);

// Method to handle the click event and store the selected item
const handleItemClick = (item) => {
  selectedItem.value = item;  // Set the clicked item to the reactive property
};



const tableCols = ['Név','Osztály','Kategória','Szakma','Módosítás','Törlés'];

onMounted(async () => {
  try {
    assignments.value = await store.fetchAllAssignments();
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <section class="w-full h-full flex flex-col text-[--text-color] items-center">

    <div class="flex w-full justify-center items-center text-2xl !h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Feladatok</span>
    </div>

    <div class="mt-8 flex flex-col items-center">

      <!-- Search -->

      <div class="my-8">
        <input v-model="nameSearchQuery" type="text" placeholder="Keresés" class="w-[40dvw] lg:w-[20dvw] bg-transparent placeholder-gray-800 text-center border-b border-[--border-color] focus:outline-none" />🔍
      </div>

      <!-- Assignment Table -->
      <div v-if="assignments.length <= 0">
        <h1>Nincsenek elérhető modulok</h1>
      </div>

      <div v-else class="w-full max-w-[80dvw] lg:max-w-[60dvw] overflow-x-scroll rounded-md bg-[--table-bg-color]">

        <table class="table-auto max-h-[15em] w-full text-center">
          <thead>
          <tr class="bg-[--table-bg-color] text-[--table-text-color]">
            <th v-for="content in tableCols" :key="content" class="px-4 py-1">
              {{ content }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(assignment, index) in filteredAssignmentsByName"
              :key="index"
              class="odd:bg-[--table-tr-color-odd] even:bg-[--table-tr-color-even]"
          >
            <td class="px-4 py-1">
              <button @click="handleItemClick(assignment)" class="text-[--text-link-color] hover:text-[--text-link-hover-color] active:text-gray-800">
                {{ assignment.name }}
              </button>
            </td>
            <td class="px-4 py-1">{{ assignment.grade }}</td>
            <td class="px-4 py-1">{{ assignment.category }}</td>
            <td class="px-4 py-1">{{ assignment.profession }}</td>
           <td class="px-4 py-1">
              <button @click="editAssignment(assignment.id)" class="bg-blue-600 hover:bg-blue-500 text-[--text-color] py-1 px-4 rounded">
                ✎
              </button>
            </td>
            <td class="px-4 py-1">
              <button @click="deleteAssignment(assignment.id)" class="bg-red-600 hover:bg-red-500 text-[--text-color] px-4 rounded">
                <span class="text-2xl">
                 🗑
                </span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>

      </div>

      <div class="w-full flex justify-center items-center">
        <ListShow :selectedItem="selectedItem" />
      </div>

    </div>
  </section>
</template>