<!-- PopupModal.vue -->
<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content">
            <button @click="closePopup" class="close-btn">×</button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closePopup = () => {
    emit("close");
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    height: 90%;
    position: relative;
    overflow-x: auto;
    scrollbar-width: none;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 30px;
    font-size: 2em;
    background: none;
    color: black;
    border: none;
    cursor: pointer;
}
</style>