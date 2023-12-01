<template>
  <q-form class="column">
    <div class="row items-center justify-between q-my-sm">
      <p class="q-mr-sm">Name</p>
      <TextInput
        class="col-6"
        v-model="name"
        hint="The name of your app"
        :rules="[
          (val) => !!val || 'Required',
          (val) => !val.includes(' ') || 'No spaces',
        ]"
      />
    </div>
    <div class="row items-center justify-between q-my-sm">
      <p class="q-mr-sm">Package</p>
      <TextInput
        class="col-6"
        v-model="packageName"
        hint="com.example.app"
        lazy-rules
        :rules="[(val) => !!val || 'Required', (val: string) => /^[a-z]+(\.[a-z]+)+$/i.test(val) || 'Invalid package name']"
      />
    </div>
    <div class="row items-center justify-between q-my-sm">
      <p class="q-mr-sm">Languages</p>
      <SelectInput
        class="col-6"
        v-model="languages"
        hint="The languages your app supports"
        lazy-rules
        :rules="[(val) => !!val || 'Required']"
        multiple
        :options="languageOptions"
      />
    </div>
    <div class="row items-center justify-between q-my-sm">
      <p class="q-mr-sm">Database</p>
      <SelectInput
        class="col-6"
        :model-value="databaseOption"
        @update:model-value="(option) => (database = option.value)"
        hint=""
        lazy-rules
        :rules="[(val) => !!val || 'Required']"
        :options="databaseOptions"
      />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import SelectInput from 'src/components/SelectInput.vue';
import TextInput from 'src/components/TextInput.vue';
import { useAppStore } from 'src/stores/app';
import { QSelectOption } from 'quasar';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const app = useAppStore();

const { name, packageName, languages, database } = storeToRefs(app);

const databaseOption = computed(() => {
  return databaseOptions.find((option) => option.value === database.value);
});

const languageOptions = ['pt-BR', 'en-US', 'es-ES'];
const databaseOptions: QSelectOption[] = [
  {
    label: 'PostgreSQL',
    value: 'postgresql',
  },
  {
    label: 'MySQL',
    value: 'mysql',
  },
  {
    label: 'MariaDB',
    value: 'mariadb',
  },
  {
    label: 'Microsoft SQL Server',
    value: 'mssql',
  },
];
</script>
