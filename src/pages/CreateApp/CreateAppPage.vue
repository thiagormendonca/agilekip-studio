<template>
  <div class="column items-center">
    <div class="column q-gutter-y-lg items-center q-py-lg" style="width: 80%">
      <AppBPMN />
      <slot v-if="app.processes.length">
        <q-separator class="full-width" />
        <div class="section-container">
          <AppInfo />
        </div>
        <q-separator class="full-width" />
        <div class="section-container">
          <AppProcessBinding />
        </div>
        <q-separator class="full-width" />
        <div class="section-container">
          <AppEntities />
        </div>
        <q-separator class="full-width" />
        <div class="section-container">
          <EntitiesRelationships />
        </div>
        <q-separator class="full-width" />
        <div class="section-container">
          <AppForms />
        </div>
        <q-separator class="full-width" />
        <q-btn
          class="q-mt-md"
          color="secondary"
          label="Create App"
          @click="createApp"
        />
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppInfo from './components/AppInfo.vue';
import AppEntities from './components/AppEntities.vue';
import EntitiesRelationships from './components/EntitiesRelationships.vue';
import AppForms from './components/AppForms.vue';
import AppBPMN from './components/AppBPMN.vue';
import { createAppFiles } from './services';
import AppProcessBinding from './components/AppProcessBinding.vue';
import { useAppStore } from 'src/stores/app';

const app = useAppStore();

function createApp() {
  createAppFiles(app);
}
</script>
<style scoped>
.section-container {
  width: 60%;
}
</style>
