<script setup>
import axios from 'axios';
import { useHead } from 'unhead';
import VueWordCloud from 'vuewordcloud';

import BlogList from '../components/BlogList.vue';
</script>

<script>
export default {
  name: 'HomeView',
  components: [BlogList, VueWordCloud],
  data() {
    return {
      blogList: null,
      tagList: null,
    }
  },
  async mounted() {
    useHead({
      title: 'Just another random developer in the world'
    })
    const [blog, tags] = await Promise.all([
      axios('/data/blog-list.json'),
      axios('/data/tag-list.json')
    ]);
    this.blogList = blog.data;
    this.tagList = tags.data;
  },
  computed: {
    tagData() {
      if (!this.tagList) {
        return
      }

      return Object.keys(this.tagList).map((word) => [
        word,
        this.tagList[word].length,
      ]) 
    }
  },
  methods: {
    onWordClick(word) {
      this.$router.push(`/tag/${word[0]}`)
    }
  }
}
</script>

<template>
  <div class="homepage">
    <blog-list :list="blogList"></blog-list>
    <vue-word-cloud
      class="tags-cloud"
      style="
        height: 200px;
        width: 400px;
      "
      :words="tagData"
      :spacing="0.3"
      :color="([, weight]) => weight >= 2 ? 'var(--color-primary)' : 'var(--color-text-dim)'"
      font-family="'Inconsolata', monospace"
    >
      <template v-slot="{text, weight, word}">
        <div :title="weight" style="cursor: pointer;" @click="onWordClick(word)">
          {{ text }}
        </div>
      </template>
    </vue-word-cloud>
  
  </div>
</template>

<style>
  .homepage {
    display: flex;
    gap: var(--normal-spacing);
    align-items: flex-start;
  }

  .homepage:before {
    content: "";
    border: 1px dashed var(--color-border);
    align-self: stretch;
  }

  .homepage .blog-list {
    order: -1;
  }
  
  .tags-cloud {
    flex-basis: 400px;
    margin-top: var(--normal-spacing);
  }

  .tags-cloud > div {
    top: 0;
  }

  @media only screen and (max-width: 768px)  {
    .homepage {
      flex-direction: column;
      align-items: center;
    }

    .homepage:before {
      border: 0;
    }
  }
</style>
