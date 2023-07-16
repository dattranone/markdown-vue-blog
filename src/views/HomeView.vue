<script setup>
import axios from 'axios';
import { useHead } from 'unhead';

import BlogList from '../components/BlogList.vue';
</script>

<script>
export default {
  name: 'HomeView',
  components: [BlogList],
  data() {
    return {
      blogList: null
    }
  },
  async mounted() {
    useHead({
      title: 'Just another random developer in the world'
    })
    const { data } = await axios('/data/blog-list.json');
    this.blogList = data;
  },
}
</script>

<template>
  <blog-list :list="blogList"></blog-list>
</template>

