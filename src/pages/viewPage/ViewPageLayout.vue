<template>
  <div class="view-page" v-if="isSizeCompatible">
    <div class="view-page-content">
      <div v-if="isSizeEnough" class="sidebar">
        <navbar />
        <div class="sidebar-controls">
          <button :class="{ active: viewType === 'modules' }" @click="setViewType('modules')">Modulok</button>
          <button :class="{ active: viewType === 'tasks' }" @click="setViewType('tasks')">Feladatok</button>
        </div>
        <category-navbar v-for="(category, index) in filteredCategories" :key="index" :category="category.name"
          :modules="category.items" @moduleSelected="updateContent" />
      </div>

      <div v-else class="hamburger-menu">
        <button @click="toggleMenu" class="hamburger-icon">
          <span v-if="menuOpen">X</span>
          <span v-else>☰</span>
        </button>
        <div v-if="menuOpen" class="hamburger-menu-items">
          <navbar />
          <div class="sidebar-controls">
            <button :class="{ active: viewType === 'modules' }" @click="setViewType('modules')">Modulok</button>
            <button :class="{ active: viewType === 'tasks' }" @click="setViewType('tasks')">Feladatok</button>
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
  </div>
  <div class="size-error" v-else>
    <p>Ekkora méretben az oldal nem megtekinthető</p>
  </div>
</template>


<script>
import Navbar from "../../Components/ViewPageComponents/Navbar.vue";
import CategoryNavbar from "../../Components/ViewPageComponents/CategoryNavbar/CategoryNavbar.vue";
import Content from "../../Components/ViewPageComponents/Content/Content.vue";

export default {
  components: {
    Navbar,
    CategoryNavbar,
    Content,
  },
  data() {
    return {
      viewType: "modules",
      backendData: [],
      selectedModule: null,
      isSizeEnough: true,
      isSizeCompatible: true,
      menuOpen: false,
    };
  },
  computed: {
    filteredCategories() {
      const groupedByCategory = {};

      this.backendData.forEach((item) => {
        item.categories.forEach((category) => {
          if (!groupedByCategory[category.categoryName]) {
            groupedByCategory[category.categoryName] = { name: category.categoryName, items: [] };
          }
          groupedByCategory[category.categoryName].items.push(item);
        });
      });

      return Object.values(groupedByCategory);
    },
  },
  methods: {
    setViewType(type) {
      this.viewType = type;
      this.fetchData(type);
    },
    fetchData(type) {
      if (type === "modules") {
        this.backendData = [
          {
            id: "d0c41a1c-7e23-4855-b2e8-b0055986c0ef",
            name: "NestJS alapok",
            content: "Ez itt a nestjs alapok cucca HAHAHAHA",
            description: "Description for Module 1",
            createdAt: "2024-12-27T21:54:35.600Z",
            updatedAt: "2024-12-27T21:54:35.600Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Backend" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
          {
            id: "d0c41a1c-7e23-4855-b2e8-b0055986c0ef",
            name: "NODE alapok",
            content: "EZ ITT A NODE ALAPOK LOL",
            description: "Description for Module 1",
            createdAt: "2024-12-27T21:54:35.600Z",
            updatedAt: "2024-12-27T21:54:35.600Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Backend" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
          {
            id: "d0c41a1c-7e23-4855-b2e8-b0055986c0ef",
            name: "Vue alapok",
            content: "Ez itt a vue alapok cucca HAHAHAHAH",
            description: "Description for Module 1",
            createdAt: "2024-12-27T21:54:35.600Z",
            updatedAt: "2024-12-27T21:54:35.600Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Frontend" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
          {
            id: "d0c41a1c-7e23-4855-b2e8-b0055986c0ef",
            name: "SQL alapok",
            content: "Ez itt a SQL alapok cucca HAHAHAHAH",
            description: "Description for Module 1",
            createdAt: "2024-12-27T21:54:35.600Z",
            updatedAt: "2024-12-27T21:54:35.600Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Database" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
        ];
      } else if (type === "tasks") {
        this.backendData = [
          {
            id: "0fab0f69-f5a3-4881-a7e5-148f08cd6823",
            name: "NestJS gyakorlatok",
            content: "Ezek itt a nestjs gyakorlatok HAHAHA",
            description: "Description for Task 1",
            createdAt: "2024-12-27T21:54:51.943Z",
            updatedAt: "2024-12-27T21:54:51.943Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Backend" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
          {
            id: "0fab0f69-f5a3-4881-a7e5-148f08cd6823",
            name: "Express gyakorlatok",
            content: "Ezek itt a Express gyakorlatok HAHAHA",
            description: "Description for Task 1",
            createdAt: "2024-12-27T21:54:51.943Z",
            updatedAt: "2024-12-27T21:54:51.943Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "Backend" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
          {
            id: "0fab0f69-f5a3-4881-a7e5-148f08cd6823",
            name: "Vue gyakorlatok",
            content: "Ezek itt a vue gyarkolatok HAHAH",
            description: "Description for Task 1",
            createdAt: "2024-12-27T21:54:51.943Z",
            updatedAt: "2024-12-27T21:54:51.943Z",
            categories: [
              { id: "19b3f2b9-3813-4d0d-8a68-fbed274b3e82", categoryName: "C#" },
            ],
            professions: [
              { id: "2da0f86f-e3b7-4d05-990f-1bed78d2fd2c", professionName: "Profession 1" },
            ],
            grades: [
              { id: "723b4baf-ba4e-496c-9d75-5594260e83bb", gradeName: "Grade 1" },
            ],
          },
        ];
      }
    },
    updateContent(module) {
      this.selectedModule = module;
      this.selectedCategory = this.filteredCategories.find((cat) =>
        cat.items.some((item) => item.id === module.id)
      )?.name || "Unknown";
    },
    checkSize() {
      if (window.innerWidth < 300 || window.innerHeight < 350) {
        this.isSizeCompatible = false;
      } else {
        this.isSizeCompatible = true;
      }
      this.isSizeEnough = window.innerWidth > 1300;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },
  mounted() {
    this.fetchData(this.viewType);
    this.checkSize();
    window.addEventListener("resize", this.checkSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkSize);
  }
};
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.hamburger-icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--text-color);
  cursor: pointer;
  background-color: var(--background-color);
  border-radius: 0 30px 30px 0;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hamburger-menu-items {
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  width: 80%;
  height: 80%;
  background-color: var(--background-color);
  z-index: 1000;
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
