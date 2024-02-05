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
          <div v-if="!isProcessBindingEntity" class="row items-center q-mb-md">
            <p class="q-ma-none">Process Binding Domain Entity</p>
            <q-checkbox
              color="secondary"
              size="xs"
              v-model="isProcessBindingDomainEntity"
              class="q-ml-none"
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
              <q-btn class="q-mt-lg" color="secondary" label="Rules">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item
                      clickable
                      @click="field.rules.readonly = !field.rules.readonly"
                    >
                      <q-checkbox
                        color="secondary"
                        size="xs"
                        v-model="field.rules.readonly"
                      />
                      <q-item-section>Read Only</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="field.rules.required = !field.rules.required"
                    >
                      <q-checkbox
                        color="secondary"
                        size="xs"
                        v-model="field.rules.required"
                      />
                      <q-item-section>Required</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="field.rules.unique = !field.rules.unique"
                    >
                      <q-checkbox
                        color="secondary"
                        size="xs"
                        v-model="field.rules.unique"
                      />
                      <q-item-section>Unique</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section
                        ><TextInput
                          color="secondary"
                          v-model="field.rules.pattern"
                          label="Pattern"
                      /></q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <TextInput
                          v-if="field.fieldType === 'Integer'"
                          color="secondary"
                          v-model="field.rules.min"
                          label="Min"
                          type="number"
                        />
                        <TextInput
                          v-else
                          color="secondary"
                          v-model="field.rules.minlength"
                          label="Min Length"
                          type="number"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <TextInput
                          v-if="field.fieldType === 'Integer'"
                          color="secondary"
                          v-model="field.rules.max"
                          label="Max"
                          type="number"
                        />
                        <TextInput
                          v-else
                          color="secondary"
                          v-model="field.rules.maxlength"
                          label="Max Length"
                          type="number"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section
                        ><TextInput
                          color="secondary"
                          v-model="field.rules.minbytes"
                          label="Min Bytes"
                          type="number"
                      /></q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section
                        ><TextInput
                          color="secondary"
                          v-model="field.rules.maxbytes"
                          label="Max Bytes"
                          type="number"
                      /></q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn
                class="q-mt-lg"
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
  onSave: (
    name: string,
    fields: IField[],
    isProcessBindingDomainEntity: boolean
  ) => void;
  entity?: IEntity;
  isProcessBindingEntity?: boolean;
}

const props = defineProps<IProps>();

const rules = [
  (val: string) => !!val || 'Required',
  (val: string) => !val.includes(' ') || 'No spaces',
];

const emptyField: IField = {
  name: '',
  fieldType: '' as FieldType,
  rules: {
    readonly: false,
    required: false,
    unique: false,
    pattern: '',
    minlength: undefined,
    maxlength: undefined,
    minbytes: undefined,
    maxbytes: undefined,
  },
};

const name = ref<string>('');
const fields = ref<IField[]>([structuredClone(emptyField)]);
const isProcessBindingDomainEntity = ref<boolean>(false);

watch(
  () => props.entity,
  (entity) => {
    if (entity) {
      name.value = entity.name;
      fields.value = entity.fields;
      isProcessBindingDomainEntity.value = entity.isProcessBindingDomainEntity;
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
  fields.value.push(structuredClone(emptyField));
}

function clear() {
  name.value = '';
  fields.value = [structuredClone(emptyField)];
  isProcessBindingDomainEntity.value = false;
}

function submit() {
  props.onSave(name.value, fields.value, isProcessBindingDomainEntity.value);
  clear();
  props.onClose();
}
</script>
