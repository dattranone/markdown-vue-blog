<template>
  <div class="blog-detail">
    <div class="blog-content">
      <vue-markdown :source="content" :options="mdOptions" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useHead } from 'unhead';
import VueMarkdown from 'vue-markdown-render';

import { getBlog } from '../helpers/blog';

const mdOptions = {
  highlight: function(str, lang) {
    // fix tags
    if (lang === 'tags') {
      try {
        const tagList = str
          .split(',')
          .map((item) => item.trim())
          .filter((item) => !!item)
          .map((item) => `<a href="/tag/${item}">${item}</a>`)

        return tagList.join(' ')
      } catch (error) {
        return str
      }
    }

    return str;
  }
}
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
.language-tags {
  display: block;
  margin-top: var(--normal-spacing);
}
.language-tags a {
  border: 1px solid;
  border-radius: 3px;
  padding: 3px 8px;
}

.blog-content img {
  margin: var(--normal-spacing) auto;
}

.blog-content blockquote {
  border-left: 3px solid var(--color-border);
  margin: var(--normal-spacing) 0;
  padding-left: var(--normal-spacing);
}

.blog-content h3 {
  margin: var(--normal-spacing) 0;
  font-weight: var(--font-bold);
}

</style>
