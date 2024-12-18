<template>
    <div class="btns">
        <button @click="showCreateModulePopup = true" class="open-popup-btn">Modul létrehozása</button>
        <button @click="showEditModulePopup = true" class="open-popup-btn">Modul szerkesztése</button>

        <button @click="showCreateEditPopup = true" class="open-popup-btn">Feladat létrehozása</button>
        <button @click="showEditEditPopup = true" class="open-popup-btn">Feladat szerkesztése</button>

        <button @click="showEditorPopup = true" class="open-popup-btn">Editor</button>
    </div>

    <UserIcon />

    <PopupModal :isOpen="showCreateModulePopup" @close="showCreateModulePopup = false">
        <CreateModulePopupMenu />
    </PopupModal>

    <PopupModal :isOpen="showEditModulePopup" @close="showEditModulePopup = false">
        <EditModulePopupMenu />
    </PopupModal>

    <PopupModal :isOpen="showCreateEditPopup" @close="showCreateEditPopup = false">
        <CreateTaskPopupMenu />
    </PopupModal>

    <PopupModal :isOpen="showEditEditPopup" @close="showEditEditPopup = false">
        <EditTaskPopupMenu />
    </PopupModal>

    <PopupModal :isOpen="showEditorPopup" @close="showEditorPopup = false">
        <EditorPopupMenu />
    </PopupModal>
</template>

<script setup>
import { ref } from "vue";
import PopupModal from "../../components/PopupComponents/PopupModal.vue";
import CreateModulePopupMenu from "../../components/PopupComponents/CreateModulePopupMenu.vue";
import EditModulePopupMenu from "../../components/PopupComponents/EditModulePopupMenu.vue";
import CreateTaskPopupMenu from "../../components/PopupComponents/CreateAssignmentPopupMenu.vue";
import EditTaskPopupMenu from "../../components/PopupComponents/EditAssignmentPopupMenu.vue";
import EditorPopupMenu from "../../components/PopupComponents/EditorPopupMenu.vue";
import UserIcon from "../../components/userIconComponents/UserIcon.vue";

const showCreateModulePopup = ref(false);
const showEditModulePopup = ref(false);
const showCreateEditPopup = ref(false);
const showEditEditPopup = ref(false);
const showEditorPopup = ref(false);
</script>

<style>
.btns {
    width: 100%;
    margin: auto;
}

.open-popup-btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-right: 10px;
}

.open-popup-btn:hover {
    background-color: #2980b9;
}
</style>