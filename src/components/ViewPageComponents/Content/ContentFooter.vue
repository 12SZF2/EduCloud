<template>
    <footer>
        <p class="left">Közzétéve: {{ formattedPublishedDate }}</p>
        <p class="right">Frissítve: {{ formattedUpdatedDate }}</p>
    </footer>
</template>

<script>
export default {
    props: ["publishedDate", "updatedDate"],
    computed: {
        formattedPublishedDate() {
            return this.formatDate(this.publishedDate);
        },
        formattedUpdatedDate() {
            return this.formatDate(this.updatedDate);
        }
    },
    methods: {
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }
};
</script>

<style scoped>
footer {
    font-size: clamp(0.5rem, 3vw, 1.5rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #585858;
    gap: 10px;
    padding: 15px;
}

footer p {
    text-align: center;
}

footer .left {
    text-align: left;
    padding-left: 10%;
}

footer .right {
    text-align: right;
    padding-right: 10%;
}

@media (max-width: 500px) {
    footer {
        padding-top: 25px;
    }
}
</style>
