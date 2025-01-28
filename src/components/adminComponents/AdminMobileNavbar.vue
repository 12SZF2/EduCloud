<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide";
import { useRoute } from "vue-router";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";

const isDropdownVisible = ref(false);
const showModulesDropdown = ref(false);
const showAssignmentsDropdown = ref(false);
const showUsersDropdown = ref(false);
const clickedLink = ref<string | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const route = useRoute();

clickedLink.value = route.path.split('/')[2];

if (clickedLink.value === 'module-create' || clickedLink.value === 'module-list' || clickedLink.value === 'module-category-create') {
  showModulesDropdown.value = true;
  showAssignmentsDropdown.value = false;
  showUsersDropdown.value = false;
} else if (clickedLink.value === 'assignment-create' || clickedLink.value === 'assignment-list') {
  showModulesDropdown.value = false;
  showAssignmentsDropdown.value = true;
  showUsersDropdown.value = false;
} else if (clickedLink.value === 'user-create' || clickedLink.value === 'user-list') {
  showModulesDropdown.value = false;
  showAssignmentsDropdown.value = false;
  showUsersDropdown.value = true;
}

const wasToggled = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  wasToggled.value = !wasToggled.value;
};

const handleLinkClick = (link: string) => {
  clickedLink.value = link;
};

function closeDropdown() {
  isDropdownVisible.value = false;
}

function handleOutsideClick(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});

</script>

<template>
  <section>
    <div class="w-full h-full flex flex-row gap-4">
      <button @click.stop="toggleDropdown">
      <FontAwesomeIcon class="text-4xl hover:invert"  :icon="faArrowDownShortWide"/>
      </button>
    </div>
    <div v-if="isDropdownVisible">
      <div class="mt-[14px] w-[96dvw] ml-1 flex flex-col z-[9999] absolute text-[--text-color] sm:text-xl md:text-1xl bg-[--background-color] rounded-lg"
        ref="dropdownRef">
        <div class="pl-2 pt-2">
          <RouterLink to="/">
            Home
          </RouterLink>
        </div>
        <!-- Modules Dropdown -->
        <div class="ml-1">
          <div class="py-2 mt-2">
            <button
                @click="showModulesDropdown = !showModulesDropdown"
                class="w-full px-4 text-left flex items-center "
            >
              <span class="hover:text-[--text-link-hover-color-mobile] transition-colors duration-100">
              Modulok
            </span>
            </button>
            <div v-if="showModulesDropdown">
              <ul class="list-disc list-inside pl-1">
                <RouterLink
                    to="/admin/module-create"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'module-create' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="()=>{
                      handleLinkClick('module-create')
                      closeDropdown()
                    }"
                >
                  <li>Létrehozás</li>
                </RouterLink>
                <RouterLink
                    to="/admin/module-list"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'module-list' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() => {
                      handleLinkClick('module-list')
                      closeDropdown()
                    }"
                >
                  <li>Listázás</li>
                </RouterLink>
                <RouterLink
                    to="/admin/module-category-create"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'module-category-create' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() => {
                      handleLinkClick('module-category-create')
                      closeDropdown()
                    }"
                >
                  <li>Kategória létrehozása</li>
                </RouterLink>
              </ul>
            </div>
          </div>
          <hr>
          <!-- Assignments Dropdown -->
          <div class="py-2">
            <button
                @click="showAssignmentsDropdown = !showAssignmentsDropdown"
                class="w-full px-4 text-left flex items-center "
            >
              <span class="hover:text-[--text-link-hover-color-mobile] transition-colors duration-100">
              Feladatok
            </span>
            </button>
            <div v-if="showAssignmentsDropdown">
              <ul class="list-disc list-inside">
                <RouterLink
                    to="/admin/assignment-create"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'assignment-create' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() =>{
                      handleLinkClick('assignment-create')
                      closeDropdown()
                    }"
                >
                  <li>Létrehozás</li>
                </RouterLink>
                <RouterLink
                    to="/admin/assignment-list"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'assignment-list' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() => {
                      handleLinkClick('assignment-list')
                      closeDropdown()
                    }"
                >
                  <li>Listázás</li>
                </RouterLink>
              </ul>
            </div>
          </div>
          <hr>
          <!-- Users Dropdown -->
          <div class="py-2">
            <button
                @click="showUsersDropdown = !showUsersDropdown"
                class="w-full px-4 text-left flex items-center"
            >
              <span class="hover:text-[--text-link-hover-color-mobile] transition-colors duration-100">
              Felhasználók
            </span>
            </button>
            <div v-if="showUsersDropdown">
              <ul class="list-disc list-inside">
                <RouterLink
                    to="/admin/user-create"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'user-create' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() => {
                      handleLinkClick('user-create')
                      closeDropdown()
                    }"
                >
                  <li>Létrehozás</li>
                </RouterLink>
                <RouterLink
                    to="/admin/user-list"
                    class="block px-4 text-lg hover:text-[--text-link-hover-color-mobile] transition-colors duration-100"
                    :style="{ color: clickedLink === 'user-list' ? 'var(--active-page-link-color-mobile)' : '' }"
                    @click="() => {
                      handleLinkClick('user-list')
                      closeDropdown()
                    }"
                >
                  <li>Listázás</li>
                </RouterLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
