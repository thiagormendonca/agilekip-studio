<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-grey-3 text-black q-px-lg q-py-sm">
      <q-toolbar>
        <q-img
          src="images/agilekip-logo.png"
          style="height: 54px; max-width: 72px"
        />
        <q-toolbar-title> AgileKIP Studio </q-toolbar-title>

        <q-btn
          label="AgileKIP Documentation"
          flat
          @click="onDocumentationClick"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
function onDocumentationClick() {
  window.open('https://agilekip.github.io/pap-documentation', '_blank');
}
</script>
