<script setup>
import axios from 'axios';
import { RouterLink } from 'vue-router'
</script>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      blogList: null
    }
  },
  async mounted() {
    const { data } = await axios('/data/blog-list.json');
    this.blogList = data;
  },
}
</script>


<template>
  <div v-if="blogList">
    <div v-for="blogItem in blogList" :key="blogItem.id">
      <router-link :to="`/blog/${blogItem.id}`">
        <h3>{{blogItem.title}}</h3>
        <div>
          {{blogItem.summary}}
        </div>
      </router-link>
    </div>
  </div>
</template>
