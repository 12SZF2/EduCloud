<template>
  <div class="view-page" v-if="isSizeCompatible">
    <div class="view-page-content">
      <div v-if="isSizeEnough" class="sidebar">
        <navbar />
        <div class="sidebar-controls">
          <button :class="{ active: viewType === 'modules' }" @click="setViewType('modules')">Modulok</button>
          <button :class="{ active: viewType === 'assignments' }" @click="setViewType('assignments')">Feladatok</button>
        </div>
        <category-navbar v-for="(category, index) in filteredCategories" :key="index" :category="category.name"
          :modules="category.items" @moduleSelected="updateContent" />
      </div>

      <div v-else class="hamburger-menu">
        <div v-if="menuOpen" class="hamburger-menu-items">
          <navbar />
          <div class="sidebar-controls">
            <button :class="{ active: viewType === 'modules' }" @click="setViewType('modules')">Modulok</button>
            <button :class="{ active: viewType === 'assignments' }" @click="setViewType('assignments')">Feladatok
            </button>
          </div>
          <div class="categories">
            <category-navbar v-for="(category, index) in filteredCategories" :key="index" :category="category.name"
              :modules="category.items" @moduleSelected="updateContent" />
          </div>
        </div>

      </div>

      <div class="main-content">
        <content v-if="selectedModule" :moduleTitle="selectedModule.name"
          :categoryTitle="selectedModule.categories[0].categoryName" :content="selectedModule.content" :author="'N/A'"
          :publishedDate="selectedModule.createdAt" :updatedDate="selectedModule.updatedAt" />
      </div>
    </div>
    <PopupModal :isOpen="showEditModulePopup" @close="showEditModulePopup = false">
      <EditModulePopupMenu :module-prop="selectedModule" />
    </PopupModal>
    <PopupModal :isOpen="showEditAssignmentPopup" @close="showEditAssignmentPopup = false">
      <EditAssignmentPopupMenu :assignment-prop="selectedModule" />
    </PopupModal>
    <PopupModal :isOpen="showEditorPopup" @close="showEditorPopup = false">
      <EditorPopupMenu :content='selectedModule.content' />
    </PopupModal>
  </div>
  <div class="size-error" v-else>
    <p>Ekkora méretben az oldal nem megtekinthető</p>
  </div>
</template>


<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import Navbar from '@/components/ViewPageComponents/Navbar.vue';
import CategoryNavbar from '@/components/ViewPageComponents/CategoryNavbar/CategoryNavbar.vue';
import Content from '@/components/ViewPageComponents/Content/Content.vue';
import { useViewStore } from "@/stores/view";
import PopupModal from "@/components/PopupComponents/PopupModal.vue";
import EditModulePopupMenu from "@/components/PopupComponents/EditModulePopupMenu.vue";
import EditAssignmentPopupMenu from "@/components/PopupComponents/EditAssignmentPopupMenu.vue";
import EditorPopupMenu from "@/components/PopupComponents/EditorPopupMenu.vue";
import { on, emit } from "@/utils/eventBus.util";

const store = useViewStore();

const showEditModulePopup = ref(false);
const showEditAssignmentPopup = ref(false);
const showEditorPopup = ref(false);

const viewType = ref('modules');
const selectedModule = ref({
  name: 'None',
  // content: 'None',
  content: `
  # Markdown Teszt

  Ez egy **félkövér** és egy *dőlt* szöveg.

  ## Lista

  - Első pont
  - Második pont
    - Alpont
    - Még egy alpont

  ## Kód blokk

  \`\`\`javascript
  console.log("Hello, World!");
  \`\`\`

  ## Link és kép

  [OpenAI](https://openai.com)

  # Markdown Teszt

  Ez egy **félkövér** és egy *dőlt* szöveg.

  ## Lista

  - Első pont
  - Második pont
    - Alpont
    - Még egy alpont

  ## Kód blokk

  \`\`\`javascript
  console.log("Hello, World!");
  \`\`\`

  ## Link és kép

  [OpenAI](https://openai.com)

  # Markdown Teszt

  Ez egy **félkövér** és egy *dőlt* szöveg.

  ## Lista

  - Első pont
  - Második pont
    - Alpont
    - Még egy alpont

  ## Kód blokk

  \`\`\`javascript
  console.log("Hello, World!");
  \`\`\`

  ## Link és kép

  [OpenAI](https://openai.com)

  # Markdown Teszt

  Ez egy **félkövér** és egy *dőlt* szöveg.

  ## Lista

  - Első pont
  - Második pont
    - Alpont
    - Még egy alpont

  ## Kód blokk

  \`\`\`javascript
  console.log("Hello, World!");
  \`\`\`

  ## Link és kép

  [OpenAI](https://openai.com)

  ![Kép példája](https://i.redd.it/hpf5dtom6qbd1.jpeg)
  `,
  createdAt: 'None',
  updatedAt: 'None',
  categories: [
    {
      categoryName: 'None',
    }
  ]
});
const selectedCategory = ref('');
const isSizeEnough = ref(true);
const isSizeCompatible = ref(true);
const menuOpen = ref(false);

const filteredCategories = computed(() => {
  const groupedByCategory = {};

  if (viewType.value == 'modules') {
    store.modules.forEach((item) => {
      item.categories.forEach((category) => {
        if (!groupedByCategory[category.categoryName]) {
          groupedByCategory[category.categoryName] = { name: category.categoryName, items: [] };
        }
        groupedByCategory[category.categoryName].items.push(item);
      });
    });
  } else if (viewType.value == 'assignments') {
    store.assignments.forEach((item) => {
      item.categories.forEach((category) => {
        if (!groupedByCategory[category.categoryName]) {
          groupedByCategory[category.categoryName] = { name: category.categoryName, items: [] };
        }
        groupedByCategory[category.categoryName].items.push(item);
      });
    });
  }
  return Object.values(groupedByCategory);
});

function setViewType(type) {
  viewType.value = type;
}


function updateContent(module) {
  selectedModule.value = module;
  selectedCategory.value = filteredCategories.value.find((cat) =>
    cat.items.some((item) => item.id === module.id)
  )?.name || 'Unknown';
}

function checkSize() {
  if (window.innerWidth < 300 || window.innerHeight < 350) {
    isSizeCompatible.value = false;
  } else {
    isSizeCompatible.value = true;
  }
  isSizeEnough.value = window.innerWidth > 1300;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

onMounted(() => {
  checkSize();
  window.addEventListener('resize', checkSize);
  on('editContent', () => {
    if (viewType.value === 'modules') {
      showEditModulePopup.value = true;
    } else {
      showEditAssignmentPopup.value = true;
    }
  });
  on('closeEditContent', () => {
    showEditModulePopup.value = false;
    showEditAssignmentPopup.value = false;
  });
  on('openPopup', () => {
    const hMenu = document.querySelectorAll('.hamburger-menu');
    hMenu.forEach(menu => {
      (menu as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      (menu as HTMLElement).style.zIndex = '1';
    });
    toggleMenu()
    emit('removezindex')
  });
  on('closePopup', () => {
    const hMenu = document.querySelectorAll('.hamburger-menu');
    hMenu.forEach(menu => {
      (menu as HTMLElement).style.backgroundColor = 'transparent';
      (menu as HTMLElement).style.zIndex = '-1';
    });
    toggleMenu()
    emit('addzindex')
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkSize);
});
</script>


<style scoped>
.size-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--text-color);
}

.view-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  color: var(--text-color)
}

.view-page-content {
  display: flex;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
}

.sidebar {
  width: 20%;
  padding: 10px;
  border-right: 2px solid #585858;
}

.sidebar-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #585858;
}

.sidebar-controls button {
  flex: 1;
  font-size: 1.5rem;
  font-weight: 1000;
  margin: 0 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.sidebar-controls button.active {
  color: var(--active-text-color);
}

.sidebar-controls button:hover {
  transform: scale(1.1);
}

.main-content {
  flex: 1;
  padding: 20px;
}

.hamburger-menu {
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  border-left: unset;
}

.hamburger-menu-items {
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  width: 98%;
  height: 98%;
  background-color: var(--background-color-transparent);
  backdrop-filter: blur(3000px);
}

.hamburger-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.hamburger-controls {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.hamburger-controls button {
  font-size: 1.5rem;
  font-weight: 1000;
  margin: 10px 0;
  padding: 10px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hamburger-controls button.active {
  color: var(--active-text-color);
}

.hamburger-controls button:hover {
  transform: scale(1.1);
}
</style>
