<script setup lang="ts">
import { ref } from 'vue';
import {useRoute} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const showModulesDropdown = ref(false);
const showAssignmentsDropdown = ref(false);
const showUsersDropdown = ref(false);
const clickedLink = ref<string | null>(null);

const route = useRoute();

clickedLink.value = route.path.split('/')[2];

if(clickedLink.value === 'module-create' || clickedLink.value === 'module-list' || clickedLink.value === 'module-category-create') {
  showModulesDropdown.value = true;
  showAssignmentsDropdown.value = false;
  showUsersDropdown.value = false;
} else if(clickedLink.value === 'assignment-create' || clickedLink.value === 'assignment-list') {
  showModulesDropdown.value = false;
  showAssignmentsDropdown.value = true;
  showUsersDropdown.value = false;
} else if(clickedLink.value === 'user-create' || clickedLink.value === 'user-list') {
  showModulesDropdown.value = false;
  showAssignmentsDropdown.value = false;
  showUsersDropdown.value = true;
}

const handleLinkClick = (link: string) => {
  clickedLink.value = link;
};

</script>

<template>
  <section>
    <div class="flex flex-col border-t-[1px] border-t-[--border-color] text-[--text-color] sm:text-xl md:text-1xl">
      <!-- Modules Dropdown -->
      <div class="ml-1">
        <div class="py-2 mt-2">
          <button
              @click="showModulesDropdown = !showModulesDropdown"
              class="w-full px-4 text-left flex items-center "
          >
            <span :class="{'rotate-90': showModulesDropdown}" class="mr-2 transition-transform  duration-200">
              <FontAwesomeIcon :icon="faArrowRight" />
            </span>
            <span class="hover:text-[--text-color-invert] transition-colors duration-100">
              Modulok
            </span>
          </button>
          <div v-if="showModulesDropdown">
            <ul class="list-disc list-inside pl-1">
              <RouterLink
                  to="/admin/module-create"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'module-create' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('module-create')"
              >
                <li>Létrehozás</li>
              </RouterLink>
              <RouterLink
                  to="/admin/module-list"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'module-list' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('module-list')"
              >
                <li>Listázás</li>
              </RouterLink>
              <RouterLink
                  to="/admin/module-category-create"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'module-category-create' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('module-category-create')"
              >
                <li>Kategória létrehozása</li>
              </RouterLink>
            </ul>
          </div>
        </div>

        <!-- Assignments Dropdown -->
        <div class="py-2">
          <button
              @click="showAssignmentsDropdown = !showAssignmentsDropdown"
              class="w-full px-4 text-left flex items-center "
          >
            <span :class="{'rotate-90': showAssignmentsDropdown}" class="mr-2 transition-transform  duration-200">
              <FontAwesomeIcon :icon="faArrowRight" />
            </span>
            <span class="hover:text-[--text-color-invert] transition-colors duration-100">
              Feladatok
            </span>
          </button>
          <div v-if="showAssignmentsDropdown">
            <ul class="list-disc list-inside">
              <RouterLink
                  to="/admin/assignment-create"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'assignment-create' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('assignment-create')"
              >
                <li>Létrehozás</li>
              </RouterLink>
              <RouterLink
                  to="/admin/assignment-list"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'assignment-list' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('assignment-list')"
              >
                <li>Listázás</li>
              </RouterLink>
            </ul>
          </div>
        </div>

        <!-- Users Dropdown -->
        <div class="py-2">
          <button
              @click="showUsersDropdown = !showUsersDropdown"
              class="w-full px-4 text-left flex items-center"
          >
            <span :class="{'rotate-90': showUsersDropdown}" class="mr-2 transition-transform  duration-200">
              <FontAwesomeIcon :icon="faArrowRight" />
            </span>
            <span class="hover:text-[--text-color-invert] transition-colors duration-100">
              Felhasználók
            </span>
          </button>
          <div v-if="showUsersDropdown">
            <ul class="list-disc list-inside">
              <RouterLink
                  to="/admin/user-create"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'user-create' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('user-create')"
              >
                <li>Létrehozás</li>
              </RouterLink>
              <RouterLink
                  to="/admin/user-list"
                  class="block px-4 text-lg hover:text-[--text-color-invert] transition-colors duration-100"
                  :style="{ color: clickedLink === 'user-list' ? 'var(--active-page-link-color)' : '' }"
                  @click="handleLinkClick('user-list')"
              >
                <li>Listázás</li>
              </RouterLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>