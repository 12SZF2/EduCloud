<template>
  <div :style="{ backgroundImage: `url(${currentBackground})` }" class="container">
    <div class="navigation">
      <div class="nav-header">
        <div class="search-container">
          <button class="back-button" @click="goBack">←</button>
          <div class="search-wrapper">
            <input type="text" v-model="searchQuery" placeholder="Search" class="search-input" />
          </div>
          <div class="vonal-vertical"></div>
          <UserIcon @toggleDropdown="toggleDropdown" />
        </div>
        <div class="user-dropdown" v-if="dropdownVisible">
          <ThemeMenu @changeBackground="changeBackground" />
          <div class="dropdown-menu">
            <button class="dropdown-item" @click="logout">Logout</button>
          </div>
        </div>
      </div>

      <div class="nav-tabs">
        <span :class="{ active: activeTab === 'modules' }" @click="switchTab('modules')">Modules</span>
        <span :class="{ active: activeTab === 'tasks' }" @click="switchTab('tasks')">Tasks</span>
      </div>

      <ul class="category-list">
        <li v-for="category in filteredCategories" :key="category.id">
          <div class="category-title" @click="toggleCategory(category)" :class="{ active: selectedCategory.id === category.id }">
            {{ category.title }}
            <span class="arrow">{{ category.expanded ? '▲' : '▼' }}</span>
          </div>
          <ul v-if="category.expanded" class="sub-list">
            <li v-for="subItem in category.subItems" :key="subItem.id" @click.stop="selectSubItem(subItem)">
              {{ subItem.title }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="content">
      <header class="content-header">
        <h1>{{ selectedCategory.title }}</h1>
        <h2 v-if="selectedSubItem">{{ selectedSubItem.title }}</h2>
      </header>
      <div class="vonal"></div>
      <section class="content-body">
        <p>{{ selectedSubItem ? selectedSubItem.content : selectedCategory.content }}</p>
        <div class="content-meta">
          <div class="vonalbottom"></div>
          <span>Published by: {{ selectedCategory.publishedBy }}</span>
          <span>Published on: {{ selectedCategory.publishDate }}</span>
          <span>Last updated: {{ selectedCategory.lastUpdated }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UserIcon from "@/components/userIconComponents/UserIcon.vue";
import ThemeMenu from "@/components/themeChangerComponents/ThemeMenu.vue";

const dropdownVisible = ref(false);
const toggleDropdown = () => (dropdownVisible.value = !dropdownVisible.value);

const currentBackground = ref("imgs/day.jpg");
const changeBackground = (newBackground) => {
  currentBackground.value = newBackground;
};

const modules = ref([
  { id: 1, title: "Frontend", content: "Introduction to HTML basics.", publishedBy: "Admin", publishDate: "2024-01-10", lastUpdated: "2024-02-01", expanded: false, subItems: [{ id: "1-1", title: "HTML", content: "HTML details" }, { id: "1-2", title: "JS", content: "JS details" }] },
  { id: 2, title: "Backend", content: "Server-side programming basics.", publishedBy: "Admin", publishDate: "2024-02-10", lastUpdated: "2024-03-01", expanded: false, subItems: [{ id: "2-1", title: "Node.js", content: "Node.js basics" }, { id: "2-2", title: "Js", content: "Js management" }] },
  { id: 3, title: "C#", content: "C# programming concepts.", publishedBy: "Admin", publishDate: "2024-02-10", lastUpdated: "2024-03-01", expanded: false, subItems: [{ id: "3-1", title: "C# Basics", content: "Introduction to C#" }] },
  { id: 4, title: "Adatbázis kezelés", content: "SQL Basics and best practices.", publishedBy: "Admin", publishDate: "2024-02-10", lastUpdated: "2024-03-01", expanded: false, subItems: [{ id: "4-1", title: "SQL Basics", content: "Introduction to SQL" }] },
]);

const tasks = ref([
  { id: 1, title: "Complete HTML Practice", description: "Build a basic webpage using HTML and CSS.", dueDate: "2024-12-20", status: "Pending" },
  { id: 2, title: "Node.js Assignment", description: "Create a simple REST API using Node.js and Express.", dueDate: "2024-12-22", status: "In Progress" },
  { id: 3, title: "SQL Query Task", description: "Write queries to retrieve data from a sample database.", dueDate: "2024-12-25", status: "Not Started" },
]);

const activeTab = ref("modules");
const categories = ref(modules.value);
const selectedCategory = ref(categories.value[0]);
const selectedSubItem = ref(null);
const searchQuery = ref("");

const filteredCategories = computed(() =>
  categories.value.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const switchTab = (tab) => {
  activeTab.value = tab;
  categories.value = tab === "modules" ? modules.value : tasks.value;
  selectedCategory.value = categories.value[0];
  selectedSubItem.value = null;
};

const toggleCategory = (category) => {
  if (selectedCategory.value.id === category.id) {
    category.expanded = !category.expanded;
  } else {
    categories.value.forEach((cat) => {
      if (cat.id !== category.id) {
        cat.expanded = false;
      }
    });
    category.expanded = true;
    selectedCategory.value = category;
    selectedSubItem.value = null;
  }
};

const selectSubItem = (subItem) => {
  selectedSubItem.value = subItem;
  selectedCategory.value = categories.value.find((cat) =>
    cat.subItems.some((item) => item.id === subItem.id)
  );
};

const logout = () => alert("Logged out!");
</script>

<style>
input::placeholder {
  color: #ffffff;
}

.container {
  display: flex;
  position: relative; 
  overflow: visible; 
  flex-direction: row;
  backdrop-filter: blur(10px);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #ffffff;
  font-family: Arial, sans-serif;
}
.navigation{
  width: 20%; /* Navigációs sáv fix szélessége */
  min-width: 200px; /* Minimum szélesség, hogy ne törjön meg */
  position: sticky; /* Fixálja a navigációs sávot */
  top: 0;
  height: 100vh;
  backdrop-filter: blur(10px);
  padding: 1rem;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.search-wrapper {
  display: flex;
  padding: 4px;
  align-items: center;
  background-color: #5e90d7;
  width: 170px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  flex: 1;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: rgb(255, 255, 255);
  font-size: 1rem;
}


.nav-tabs {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
}

.nav-tabs span {
  cursor: pointer;
  padding: 0.5rem;
}

.nav-tabs .active {
  color: #fbfbfb;
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
}

.category-list li {
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  transition: color 0.3s;
}

.category-list li:hover {
  color: #ffffff;
  background: none;
}

.category-list .active {
  color: #fafafa;
}

.category-list .category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.category-list .category-title .arrow {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  user-select: none;
}


.content-header {
  margin-bottom: 1rem;
}

.content-body {
  margin-top: 1rem;
}

.content-meta {
  margin-top: auto;
  font-size: 1rem;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.change-bg-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }

  .navigation {
    width: 20%;
    height: 100vh;
  }

  .content {
    width: 80%;
  }

  .nav-header {
    flex-wrap: nowrap;
  }

  .category-list {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (min-width: 1024px) {
  .content {
    padding: 3rem;
  }

  .category-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.user-menu {
  position: relative;
  display: inline-block;
}
.vonal {
  width: 75dvw;
  max-width: 1700px;
  height: 1px;
  background-color: #000000ac;
}
.vonalbottom { 
  width: calc(100% + 50px); /* A vonal szélessége 50px-szel hosszabb */
  height: 1px; /* Vonal magassága */
  background-color: #000; /* Fekete szín */
  position: relative; /* A vonal helyzete a szülőhöz igazodik */
  width: 78%; /* A vonal teljes szélessége */
  height: 1px; 
  background-color: #000; /* Szín */
  margin: 2rem 0 0 auto;
  position: relative;
}



.vonal-vertical {
  width: 1px;
  background-color: #000000ac;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
