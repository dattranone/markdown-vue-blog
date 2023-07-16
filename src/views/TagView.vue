<script setup>
import axios from 'axios';
import { useHead } from 'unhead';

import BlogList from '../components/BlogList.vue';
</script>

<script>
export default {
  name: 'TagView',
  components: [BlogList],
  data() {
    return {
      id: this.$route.params.id,
      tagList: [],
    }
  },
  async mounted() {
    useHead({
      title: 'Just another random developer'
    })
    const { data: allTagList } = await axios('/data/tag-list.json')
    const tagList = allTagList[this.id]
    this.tagList = tagList
  },
}
</script>

<template>
  <h1>Tag {{this.id}}:</h1>
  <blog-list :list="tagList"></blog-list>
</template>
