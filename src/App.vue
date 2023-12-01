<template>
  <router-view />
</template>

<script setup lang="ts">
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
});
</script>
