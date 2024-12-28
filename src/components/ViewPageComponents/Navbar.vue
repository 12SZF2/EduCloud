<template>
    <nav>
        <SvgIcon type="mdi" :path="iconPath" class="icon-back" @click="goBack" />
        <input type="text" placeholder="Kereső" v-model="searchQuery" />
        <user-icon />
    </nav>
</template>

<script>
import UserIcon from "../userIconComponents/UserIcon.vue";
import { mdiArrowLeft } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    components: { UserIcon, SvgIcon },
    data() {
        return { searchQuery: "", iconPath: mdiArrowLeft };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 10px;
}

input {
    border-radius: 50px;
    min-width: 100px;
    flex-grow: 1;
    flex-shrink: 1;

    text-align: center;

    box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.5);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    color: var(--text-color);
    padding: 8px;
}

input:hover {
    outline: var(--text-color) solid 1px;
}

input:focus {
    border: none;
    outline: var(--text-color) solid 3px;
}

input::placeholder {
    color: var(--text-color);
}

.icon-back {
    border-radius: 15px;
    width: 50px;
    height: 50px;
    color: var(--text-color);
    cursor: pointer;
    transition: transform 0.3s ease;
    flex-shrink: 0;

    &:hover {
        transform: scale(1.2);
    }
}
</style>