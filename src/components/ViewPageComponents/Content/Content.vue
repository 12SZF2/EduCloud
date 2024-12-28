<template>
    <div class="content-body">
        <content-header :title="moduleTitle" :category="categoryTitle" />
        <content-body :content="content" />
        <content-footer :author="author" :publishedDate="publishedDate" :updatedDate="updatedDate" />
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

<style>
.content-body {}
</style>