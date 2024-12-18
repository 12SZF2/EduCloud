<template>
  <section class="popup-container">
    <div class="popup-header">
      <span>Modul szerkesztése</span>
    </div>

    <div class="popup-content">
      <div class="form-row">
        <div class="input-container">
          <div class="relative">
            <input type="text" v-model="module.name" placeholder="Modul címe" class="custom-input"/>
            <hr class="input-underline"/>
          </div>
        </div>

        <div class="input-container">
          <div class="relative">
            <input type="text" v-model="module.description" placeholder="Modul leírása" class="custom-input"/>
            <hr class="input-underline"/>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="select-container">
          <select v-model="module.gradeId">
            <option value="" disabled hidden>Osztály</option>
            <option v-for="grade in store.grades" :key="grade.id" :value="grade.id">
              {{ grade.gradeName }}
            </option>
          </select>
        </div>

        <div class="select-container">
          <select v-model="module.categoryId">
            <option value="" disabled hidden>Kategória</option>
            <option v-for="category in store.categories" :key="category.id" :value="category.id">
              {{ category.categoryName }}
            </option>
          </select>
        </div>

        <div class="select-container">
          <select v-model="module.professionId">
            <option value="" disabled hidden>Szakma</option>
            <option v-for="profession in store.professions" :key="profession.id" :value="profession.id">
              {{ profession.professionName }}
            </option>
          </select>
        </div>
      </div>

      <div class="file-buttons">
        <label class="upload-btn">
          Fájl feltöltése
          <input type="file" class="hidden" @change="handleFileChange"/>
        </label>
        <button @click="showEditorPopup = true" class="edit-btn">Fájl szerkesztése</button>
        <PopupModal :isOpen="showEditorPopup" @close="showEditorPopup = false">
          <EditorPopupMenu v-model:content="module.content"/>
        </PopupModal>
      </div>
      <div class="file-name">
        {{ module.name || "Nincsen kiválasztott fájl" }}
      </div>

      <div class="form-buttons">
        <button @click="handleModuleSave" class="save-btn">Mentés</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {usePopupStore} from "@/stores/popup.js";
import PopupModal from "@/components/PopupComponents/PopupModal.vue";
import EditorPopupMenu from "@/components/PopupComponents/EditorPopupMenu.vue";
import {useModuleStore} from "@/stores/module";

const store = usePopupStore();
const moduleStore = useModuleStore();

const showEditorPopup = ref(false);

const module = ref({
  name: "",
  content: "",
  description: "",
  gradeId: "",
  categoryId: "",
  professionId: "",
});

const clearSelections = () => {
  module.value = {
    name: "",
    content: "",
    description: "",
    gradeId: "",
    categoryId: "",
    professionId: "",
  };
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  module.value.name = file ? file.name : "";
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      if (typeof result === 'string') {
        module.value.content = result;
      } else {
        module.value.content = new TextDecoder().decode(result);
      }
    };
    reader.readAsText(file);
  } else {
    module.value.content = "";
  }
};

async function handleModuleSave() {
  try {
    await moduleStore.uploadModule(module.value);
  } catch (e) {
    console.error(e);
  }
  clearSelections();
};
</script>

<style scoped>
.popup-container {
    width: 100%;
    max-width: 930px;
    color: var(--text-color);
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
}

.popup-header {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid var(--text-color);
}

.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    overflow-y: auto;
    max-height: 70vh;
}

.form-row {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin: 20px 0;
}

.custom-input {
    width: 12vw;
    padding: 10px;
    color: var(--text-color);
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
}

.input-underline {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: var(--text-color);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    top: 100%;
}

.select-container select {
    width: 220px;
    padding: 8px;
    border: 1px solid var(--text-color);
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
    text-align: center;
}

.file-buttons {
    display: flex;
    gap: 40px;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.file-name {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.9em;
    color: var(--text-color);
    text-align: center;
}

.hidden {
    display: none;
}

.upload-btn,
.edit-btn {
    width: 100%;
    max-width: 200px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    background-color: rgb(0, 147, 205);
    color: white;
    text-align: center;
}

.upload-btn:hover,
.edit-btn:hover {
    background-color: rgb(1, 114, 159);
}

.save-btn {
    width: 100%;
    max-width: 200px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    background-color: rgb(0, 205, 0);
    color: black;
    text-align: center;
}

.save-btn:hover {
    background-color: rgb(1, 160, 1);
}

@media (max-width: 930px) {
    .popup-container {
        max-width: 90%;
    }

    .form-row {
        flex-direction: column;
        gap: 20px;
    }

    .custom-input {
        width: 100%;
    }

    .file-buttons {
        flex-direction: column;
        gap: 10px;
    }
}
</style>
