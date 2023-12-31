<template>
  <q-dialog :model-value="show" @hide="close">
    <q-card style="width: 800px">
      <q-toolbar>
        <q-toolbar-title>Update Form</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="close" />
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
            <div class="col-5">
              <p class="q-mr-sm">Name</p>
              <SelectInput
                class="col"
                v-model="input.fieldNameRef"
                lazy-rules
                :rules="[(val) => !!val || 'Required']"
                :options="[
                  ...processes[0].processBinding.fields.map((f) => f.name),
                  ...processes[0].processBinding.relationships.map(
                    (r) => `Relationship ${r.relationshipName}`
                  ),
                ]"
              />
            </div>
            <div class="col-5 row q-pt-md">
              <q-checkbox
                color="secondary"
                size="xs"
                v-model="input.readonly"
                label="Read only"
              />
              <q-checkbox
                color="secondary"
                size="xs"
                v-model="input.required"
                label="Required"
                class="q-ml-sm"
              />
            </div>
            <q-btn
              class="q-mt-md"
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
import { ref, watch } from 'vue';

interface IProps {
  show: boolean;
  onClose: () => void;
  onSave: (inputs: IInputItem[]) => void;
  form?: ITaskForm;
}

const props = defineProps<IProps>();
const app = useAppStore();
const { processes } = storeToRefs(app);

const emptyInput: IInputItem = {
  fieldNameRef: '',
  readonly: false,
  required: false,
};

const inputs = ref<IInputItem[]>([structuredClone(emptyInput)]);

function addInput() {
  inputs.value.push(structuredClone(emptyInput));
}

function clear() {
  inputs.value = [structuredClone(emptyInput)];
}

function submit() {
  props.onSave(inputs.value);
  close();
}

function close() {
  clear();
  props.onClose();
}

watch(
  () => props.form,
  (form) => {
    if (form && form.inputItems?.length) {
      inputs.value = form.inputItems;
    }
  }
);
</script>
