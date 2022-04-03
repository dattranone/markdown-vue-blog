<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <RouterLink to="/">
        <div id="logo">
          Dat Blog
        </div>
      </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>

  <footer>
    <div class="container">
      <div class="social-list">
        <a href="https://github.com/dattran92">
          <i class="fab fa-github fa-fw"></i>
        </a>
        <a href="/">
          <i class="fab fa-linkedin fa-fw"></i>
        </a>
        <a href="/">
          <i class="fab fa-stack-overflow fa-fw"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
@import '@/assets/base.css';

#app {
  padding: var(--normal-spacing) 0;
}

header {
  display: flex;
  margin-bottom: var(--large-spacing);
}

#logo {
  font-size: 3rem;
  user-select: none;
  margin-right: var(--large-spacing);
  font-weight: var(--font-bold);
}

nav a {
  margin-right: var(--normal-spacing);
}

footer {
  padding: var(--normal-spacing);
  margin-top: var(--large-spacing);
  border-top: 1px solid var(--color-border);
  background: var(--color-background-darker);
}

footer .social-list {
  display: flex;
  justify-content: flex-end;
}

footer .social-list i {
  font-size: var(--font-size-medium);
}
</style>
