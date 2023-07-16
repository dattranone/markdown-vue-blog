<script setup>
import { RouterLink } from 'vue-router';
</script>

<script>
export default {
  name: 'BlogList',
  props: ['list'],
}
</script>

<template>
  <div class="blog-list" v-if="list">
    <div class="blog-list__item" v-for="blogItem in list" :key="blogItem.id">
      <router-link :to="`/blog/${blogItem.id}`">
        <h3 class="blog-list__item-title">{{blogItem.title}}</h3>
        <div class="blog-list__item-summary">
          {{blogItem.summary}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
.blog-list__item {
  padding: var(--small-spacing) 0;
  margin-bottom: var(--normal-spacing);
  border-bottom: 1px dashed var(--color-border);
}

.blog-list__item-title {
  font-size: var(--font-size-medium);
  margin-bottom: var(--small-spacing);
}

.blog-list__item-summary {
  color: var(--color-text-dim);
}
</style>
