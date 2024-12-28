<template>
    <div class="content-body">
        <content-header :title="moduleTitle" :category="categoryTitle" class="c-header" />
        <content-body :content="content" class="c-body" />
        <content-footer :author="author" :publishedDate="publishedDate" :updatedDate="updatedDate" class="c-footer" />
    </div>
</template>

<script>
import ContentHeader from "./ContentHeader.vue";
import ContentBody from "./ContentBody.vue";
import ContentFooter from "./ContentFooter.vue";
export default {
    components: { ContentHeader, ContentBody, ContentFooter },
    props: ["moduleTitle", "categoryTitle", "content", "author", "publishedDate", "updatedDate"],
};
</script>

<style scoped>
.content-body {
    width: 100%;
    height: 100%;
}

.c-header {
    min-height: 10%;
    max-height: 10%;
    width: 100%;
}

.c-body {
    min-height: 80%;
    max-height: 80%;
    width: 100%;
}

.c-footer {
    min-height: 10%;
    max-height: 10%;
    width: 100%;
}
</style>