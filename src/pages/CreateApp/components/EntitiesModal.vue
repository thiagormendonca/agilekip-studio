<template>
  <q-dialog :model-value="show">
    <q-card style="max-width: 600px; width: 600px" class="q-pa-sm">
      <q-toolbar>
        <q-toolbar-title>Add Entity</q-toolbar-title>
        <q-btn flat round dense icon="close" @click="onClose" />
      </q-toolbar>
      <q-card-section>
        <q-form class="column">
          <div class="row items-center justify-between q-my-sm">
            <p class="q-mr-sm">Name</p>
            <TextInput
              class="col-5"
              v-model="name"
              placeholder="Insert value"
              lazy-rules
              :rules="rules"
            />
          </div>
          <div class="row justify-between">
            <span class="">Fields</span>
            <q-btn flat round dense icon="add" @click="addField" />
          </div>
          <div class="column q-mt-md">
            <div
              v-for="(field, index) in fields"
              :key="index"
              class="row items-center q-gutter-sm"
            >
              <div class="col">
                <p class="q-mr-sm">Name</p>
                <TextInput v-model="field.name" lazy-rules :rules="rules" />
              </div>
              <div class="col">
                <p class="q-mr-sm">Type</p>
                <SelectInput
                  class="col"
                  v-model="field.fieldType"
                  lazy-rules
                  :rules="rules"
                  :options="fieldTypeOptions"
                />
              </div>
              <q-btn
                :disable="fields.length === 1"
                flat
                round
                dense
                icon="delete"
                @click="fields.splice(index, 1)"
              />
            </div>
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
import SelectInput from 'src/components/SelectInput.vue';
import TextInput from 'src/components/TextInput.vue';
import { IEntity } from 'src/models/Entity';
import { FieldType, IField } from 'src/models/Field';
import { ref, watch } from 'vue';

interface IProps {
  show: boolean;
  onClose: () => void;
  onSave: (name: string, fields: IField[]) => void;
  entity?: IEntity;
}

const props = defineProps<IProps>();

const rules = [
  (val: string) => !!val || 'Required',
  (val: string) => !val.includes(' ') || 'No spaces',
];

const name = ref<string>('');
const fields = ref<IField[]>([
  {
    name: '',
    fieldType: '' as FieldType,
  },
]);

watch(
  () => props.entity,
  (entity) => {
    if (entity) {
      name.value = entity.name;
      fields.value = entity.fields;
    }
  }
);

const fieldTypeOptions = [
  'LocalDate',
  'String',
  'Integer',
  'Long',
  'BigDecimal',
  'Float',
  'Double',
  'Enum',
  'Boolean',
  'ZonedDateTime',
  'Instant',
  'Duration',
  'UUID',
  'Blob',
  'AnyBlob',
  'ImageBlob',
  'TextBlob',
];

function addField() {
  fields.value.push({
    name: '',
    fieldType: '' as FieldType,
  });
}

function clear() {
  name.value = '';
  fields.value = [
    {
      name: '',
      fieldType: '' as FieldType,
    },
  ];
}

function submit() {
  props.onSave(name.value, fields.value);
  clear();
  props.onClose();
}
</script>
