<template>
  <div class="blog-detail">
    <div class="blog-content">
      <vue-markdown :source="content" />
    </div>
  </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render';
import axios from 'axios';
</script>

<script>
export default {
  name: 'BlogView',
  data() {
    return {
      id: this.$route.params.id,
      content: "",
    }
  },
  async mounted() {
    const { data: mdContent } = await axios(`/data/blog/${this.id}.md`);
    this.content = mdContent;
  },
}
</script>

<style>
  .blog-detail h1 {
    margin-bottom: var(--normal-spacing);
  }
</style>
