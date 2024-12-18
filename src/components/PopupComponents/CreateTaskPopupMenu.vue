<template>
    <section class="popup-container">
        <div class="popup-header">
            <span>Feladat létrehozása</span>
        </div>

        <div class="popup-content">
            <div class="form-row">
                <div class="input-container">
                    <div class="relative">
                        <input type="text" placeholder="Feladat címe" class="custom-input" />
                        <hr class="input-underline" />
                    </div>
                </div>

                <div class="input-container">
                    <div class="relative">
                        <input type="text" placeholder="Feladat leírása" class="custom-input" />
                        <hr class="input-underline" />
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="select-container">
                    <select v-model="selectedGrade">
                        <option value="" disabled hidden>Osztály</option>
                        <option v-for="grade in grades" :key="grade" :value="grade">
                            {{ grade }}
                        </option>
                    </select>
                </div>

                <div class="select-container">
                    <select v-model="selectedCategory">
                        <option value="" disabled hidden>Kategória</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>

                <div class="select-container">
                    <select v-model="selectedProfession">
                        <option value="" disabled hidden>Szakma</option>
                        <option v-for="profession in professions" :key="profession" :value="profession">
                            {{ profession }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="file-buttons">
                <label class="upload-btn">
                    Fájl feltöltése
                    <input type="file" class="hidden" @change="handleFileChange" />
                </label>
                <button class="edit-btn">Fájl szerkesztése</button>
            </div>
            <div class="file-name">
                {{ selectedFileName || "Nincsen kiválasztott fájl" }}
            </div>

            <div class="form-buttons">
                <button class="save-btn">Mentés</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";

const grades = ["9", "10", "11", "12", "13"];
const categories = ["Backend", "Frontend", "etc.."];
const professions = ["Software engineer", "IT", "Electrician"];

const selectedGrade = ref("");
const selectedCategory = ref("");
const selectedProfession = ref("");
const selectedFileName = ref("");

const clearSelections = () => {
    selectedGrade.value = "";
    selectedCategory.value = "";
    selectedProfession.value = "";
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    selectedFileName.value = file ? file.name : "";
};
</script>

<style scoped>
.popup-container {
    width: 100%;
    max-width: 930px;
    color: black;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
}

.popup-header {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid #34495e;
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
    color: black;
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
}

.input-underline {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: black;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    top: 100%;
}

.select-container select {
    width: 220px;
    padding: 8px;
    border: 1px solid black;
    border-radius: 4px;
    background-color: #ecf0f1;
    color: black;
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
    color: black;
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
