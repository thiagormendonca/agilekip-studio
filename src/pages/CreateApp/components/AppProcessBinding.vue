<template>
  <div>
    <div
      class="row items-center justify-between q-gutter-x-lg"
      v-for="(process, index) in app.processes"
      :key="index"
    >
      <p class="no-margin">Process: {{ process.processBpmnId }}</p>
      <q-btn
        color="secondary"
        label="Add Process Entity"
        @click="() => openDialog(index)"
      />
    </div>
  </div>
  <EntitiesModal
    :show="showDialog"
    :on-close="() => (showDialog = false)"
    :on-save="addProcessBinding"
    is-process-binding-entity
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import EntitiesModal from './EntitiesModal.vue';
import { IField } from 'src/models/Field';
import { useAppStore } from 'src/stores/app';

const app = useAppStore();

const showDialog = ref<boolean>(false);
const processIndexInDialog = ref<number>(0);

function openDialog(index: number) {
  processIndexInDialog.value = index;
  showDialog.value = true;
}

function addProcessBinding(name: string, fields: IField[]) {
  app.setProcessBindingForProcess(
    app.processes[processIndexInDialog.value].processBpmnId,
    {
      name,
      fields,
      relationships: [],
      isProcessBindingDomainEntity: false,
    }
  );
}
</script>
