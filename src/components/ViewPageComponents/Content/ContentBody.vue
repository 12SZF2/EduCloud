<template>
    <div class="markdown-body">
        <p v-if="loading">Loading...</p>
        <div v-else v-html="renderedContent" class="markdown-content"></div>
    </div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";

export default {
    props: ["content"],
    data() {
        return {
            loading: true,
            renderedContent: "",
        };
    },
    mounted() {
        marked.setOptions({
            highlight: (code, lang) => {
                if (hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
        });

        setTimeout(() => {
            this.renderedContent = marked(this.content);
            this.loading = false;
        }, 1000);
    },
};
</script>

<style scoped>
.markdown-content {
    max-height: 74vh;
    overflow-y: auto;
    scrollbar-width: none;
    color: var(--text-color);
}

.markdown-body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    padding: 1%;
    background: transparent;
    overflow-wrap: break-word;
}

.markdown-body a {
    color: #0366d6;
    text-decoration: underline;
}

.markdown-body pre {
    background: #1e1e1e;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
}

.markdown-body code {
    font-family: "Courier New", Courier, monospace;
    background: rgba(27, 31, 35, 0.05);
    padding: 2px 4px;
    border-radius: 4px;
}

.markdown-body ul {
    padding-left: 20px;
    list-style: disc;
}

.markdown-body h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
}

.markdown-body h2 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
}

.markdown-body h3 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
}

.markdown-body table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
}

.markdown-body th,
.markdown-body td {
    border: 1px solid #ddd;
    padding: 8px;
}

.markdown-body th {
    background: #f6f8fa;
    font-weight: bold;
}
</style>
