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
import { useHead } from 'unhead';
import { getBlog } from '../helpers/blog';
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
    const [ detail, blogListResp ] = await Promise.all([
      axios(`/data/blog/${this.id}.md`),
      axios('/data/blog-list.json'),
    ]);
    const { data: mdContent } = detail;
    const { data: blogList } = blogListResp;

    this.content = mdContent;

    const currentBlog = getBlog(this.id, blogList);
    useHead({
      title: currentBlog.title,
      meta: [
        { name: 'og:title', content: currentBlog.title },
        { name: 'description', content: currentBlog.summary },
        { name: 'og:escription', content: currentBlog.summary },
      ],
    });
  },
}
</script>

<style>
  .blog-detail h1 {
    margin-bottom: var(--normal-spacing);
  }
</style>
