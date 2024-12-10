<template>
  <div class="view-page-layout">
    <!-- Sidebar Section -->
    <aside class="sidebar">
      <h2>Modules</h2>
      <nav>
        <ul>
          <li><router-link to="/view">Main View</router-link></li>
          <li><router-link to="/view/tasks">Tasks</router-link></li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content Section -->
    <main class="content">
      <div class="content-header">
        <h1>Dynamic Content</h1>
        <!-- Display Edit and Add icons only when the user is logged in -->
        <div v-if="isLoggedIn" class="action-icons">
          <span @click="toggleEditing" class="edit-icon">✏️</span>
          <span @click="addNewSection" class="add-icon">➕</span>
        </div>
      </div>

      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: true, // This should come from the user's auth status
    };
  },
  methods: {
    toggleEditing() {
      // Add logic to toggle between edit and view mode
    },
    addNewSection() {
      // Logic to add a new section to the content
    },
  },
};
</script>

<style scoped>
.view-page-layout {
  display: flex;
  height: 100vh;
  background: url('@/assets/imgs/background.jpg') no-repeat center center;
  background-size: cover;
  flex-direction: row;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-icons {
  display: flex;
  gap: 10px;
}

.edit-icon, .add-icon {
  cursor: pointer;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .view-page-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    padding: 10px;
  }
  .content {
    width: 100%;
  }
}
</style>
