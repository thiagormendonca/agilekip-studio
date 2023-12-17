<template>
  <q-table
    class="full-width"
    :columns="columns"
    :rows="forms"
    @row-click="(_, row) => editForm(row)"
  />
  <FormsModal
    :show="showDialog"
    :on-close="closeDialog"
    :on-save="saveForm"
    :form="formOnEdit"
  />
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
import FormsModal from './FormsModal.vue';
import { IInputItem, ITaskForm } from 'src/models/TaskForm';
import { useAppStore } from 'src/stores/app';

const app = useAppStore();

const showDialog = ref<boolean>(false);
const formOnEdit = ref<ITaskForm>();

const forms = computed(() => {
  if (!app.processes.length) return [];

  return [app.processes[0].startForm, ...app.processes[0].taskForms];
});

function editForm(form: ITaskForm) {
  formOnEdit.value = form;
  showDialog.value = true;
}

function saveForm(inputs: IInputItem[]) {
  if (!formOnEdit.value) return;

  if (formOnEdit.value.type === 'start-form') {
    app.setStartFormInputItems(inputs);
    return;
  }
  app.setTaskFormInputItems(formOnEdit.value.name, inputs);
}

function closeDialog() {
  showDialog.value = false;
  formOnEdit.value = undefined;
}

const columns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'type',
    label: 'Form Type',
    field: 'type',
  },
  {
    name: 'fields',
    label: 'Fields',
    field: (row) => {
      return row.inputItems.length;
    },
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    format: (value: any) => {
      return 'Edit';
    },
  },
];
</script>
