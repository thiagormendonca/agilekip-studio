<template>
  <q-select v-bind="props" dense outlined />
</template>
<script setup lang="ts">
import { QSelectProps } from 'quasar';

type IProps = QSelectProps;

const props = defineProps<IProps>();
</script>
