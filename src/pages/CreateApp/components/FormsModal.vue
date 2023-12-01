<template>
  <q-dialog :model-value="show" @hide="onClose">
    <q-card style="width: 800px">
      <q-toolbar>
        <q-toolbar-title>Update Form</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="onClose" />
      </q-toolbar>
      <q-card-section>
        <q-form class="column">
          <div class="row items-center justify-between q-my-sm">
            <p class="q-mr-sm">Name</p>
            <TextInput :model-value="form?.name" disable />
          </div>
          <div class="row justify-between">
            <span class="">Fields</span>
            <q-btn flat round dense icon="add" @click="addInput" />
          </div>
          <div
            v-for="(input, index) in inputs"
            :key="index"
            class="row items-center justify-between q-my-sm"
          >
            <div class="col-5 row items-center">
              <p class="q-mr-sm">Name</p>
              <SelectInput
                class="col"
                v-model="input.fieldNameRef"
                lazy-rules
                :rules="[(val) => !!val || 'Required']"
                :options="processes[0].processBinding.fields.map((f) => f.name)"
              />
            </div>
            <div class="col-5 row items-center">
              <q-checkbox
                v-model="input.readonly"
                label="Read only"
                class="q-mr-sm"
              />
            </div>
            <q-btn
              flat
              round
              dense
              icon="delete"
              @click="inputs.splice(index, 1)"
            />
          </div>
          <q-btn
            type="submit"
            class="q-mt-md"
            color="secondary"
            label="Save"
            @click="submit"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import SelectInput from 'src/components/SelectInput.vue';
import TextInput from 'src/components/TextInput.vue';
import { IInputItem, ITaskForm } from 'src/models/TaskForm';
import { useAppStore } from 'src/stores/app';
import { ref } from 'vue';

interface IProps {
  show: boolean;
  onClose: () => void;
  onSave: (inputs: IInputItem[]) => void;
  form?: ITaskForm;
}

const props = defineProps<IProps>();
const app = useAppStore();
const { processes } = storeToRefs(app);

const inputs = ref<IInputItem[]>([
  {
    fieldNameRef: '',
    readonly: false,
  },
]);

function addInput() {
  inputs.value.push({
    fieldNameRef: '',
    readonly: false,
  });
}

function submit() {
  props.onSave(inputs.value);
  props.onClose();
}
</script>
