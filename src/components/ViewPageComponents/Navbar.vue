<template class="absolute bottom-0 left-0 size-16">
        <SvgIcon type="mdi" :path="iconPath" class="icon-back" @click="handleIconClick" />
        
        <user-icon />

</template>

<script>
import UserIcon from "../userIconComponents/UserIcon.vue";
import { mdiArrowLeft, mdiClose, mdiMagnify } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { emit } from "@/utils/eventBus.util";

export default {
    components: { UserIcon, SvgIcon },
    data() {
        return {
            searchQuery: "",
            iconPath: mdiArrowLeft,
            isSmallScreen: false,
            mdiMagnify,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        close() {
            emit("closePopup");
        },
        handleResize() {
            this.isSmallScreen = window.innerWidth < 1300;
            this.iconPath = this.isSmallScreen ? mdiClose : mdiArrowLeft;
        },
        handleIconClick() {
            if (this.isSmallScreen) {
                this.close();
            } else {
                this.goBack();
            }
        },
    },
    mounted() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
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

.search-container {
    display: flex;
    align-items: center;
    position: relative;
    flex-grow: 1;
}

input {
    border-radius: 50px;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 100%;
    text-align: center;
    box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.5);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    color: var(--text-color);
    padding: 8px;
    padding-right: 40px;
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
}

.icon-search {
    position: absolute;
    right: 10px;
    font-size: 24px;
    color: var(--text-color);
    pointer-events: none;
}

@media (max-width: 768px) {
    input {
        width: 50px;
    }

    .icon-back {
        width: 40px;
        height: 40px;
    }
}
</style>
