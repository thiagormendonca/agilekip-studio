<template>
  <q-input v-bind="props" dense outlined />
</template>
<script setup lang="ts">
import { QInputProps } from 'quasar';

type IProps = QInputProps;

const props = defineProps<IProps>();
</script>
