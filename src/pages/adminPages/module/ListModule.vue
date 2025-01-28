<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useModuleStore} from "@/stores/module";

const store = useModuleStore();

const modules = ref('')

const nameSearchQuery = ref('');

const filteredModulesByName = computed(() => {
  return modules.value.filter(module =>
      module.name.toLowerCase().includes(nameSearchQuery.value.toLowerCase())
  );
});

//delete function
function deleteModule(id: string) {
  store.deleteModuleById(id)
  modules.value.map((value: any, index) => {
    if (id == value.id) {
      modules.value.splice(index, 1)
    }
  })
}

onMounted(async () => {
  try {
    modules.value = await store.fetchAllModules();
  } catch (e) {
    console.error(e);
  }
});

const tableCols = ['Név', 'Osztály', 'Leírás', 'Kategória', 'Szakma', 'Létrehozva', 'Módosítás', 'Törlés'];

</script>

<template>
  <section class="w-full h-full flex flex-col text-[--text-color] items-center">

    <div
        class="flex w-full justify-center items-center text-2xl h-[3em] font-bold border-b-[1px] border-[--border-color]">
      <span>Modulok</span>
    </div>

    <div class="mt-8 w-full px-4 flex flex-col items-center">

      <!-- Search -->

      <div class="my-8 w-full max-w-md flex justify-center ">
        <input
            v-model="nameSearchQuery"
            type="text"
            placeholder="Keresés"
            class="w-[40dvw] lg:w-[20dvw] bg-transparent placeholder-gray-800 text-center border-b border-[--border-color] focus:outline-none"
        />🔍
      </div>

      <!-- Modules Table -->
      <div v-if="modules.length <= 0">
        <h1 class="form-title">Nincsenek elérhető feladatok</h1>
      </div>

      <div v-else class="w-full max-w-[80dvw] lg:max-w-[60dvw] overflow-x-auto rounded-md bg-[--table-bg-color]">

        <table class="table-auto  max-h-[15em] w-full text-center">
          <thead>
          <tr class="bg-[--table-bg-color] text-[--table-text-color]">
            <th v-for="content in tableCols" :key="content" class="px-4 py-1">
              {{ content }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(module, index) in filteredModulesByName"
              :key="index"
              class="odd:bg-[--table-tr-color-odd] even:bg-[--table-tr-color-even]"
          >
            <td class="px-4 py-1">{{ module.name }}</td>
            <td class="px-4 py-1">{{ module.grade }}</td>
            <td class="px-4 py-1">{{ module.description }}</td>
            <td class="px-4 py-1">{{ module.categoryName }}</td>
            <td class="px-4 py-1">{{ module.professionName }}</td>
            <td class="px-4 py-1">{{ module.createdAt }}</td>
            <td class="px-4 py-1">
              <button
                  class="bg-blue-600 hover:bg-blue-500 text-[--text-color] py-1 px-4 rounded"
              >
                ✎
              </button>
            </td>
            <td class="px-4 py-1">
              <button
                  @click="deleteModule(module.id)"
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

    </div>
  </section>
</template>
