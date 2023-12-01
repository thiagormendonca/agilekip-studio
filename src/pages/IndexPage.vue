<template>
  <q-page class="row items-center justify-evenly">
    <q-btn
      label="Create new AgileKIP App"
      no-caps
      @click="router.push('/create-app')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
