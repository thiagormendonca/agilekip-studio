<template>
  <div class="column">
    <q-btn
      class="q-mt-md self-end"
      color="secondary"
      label="Add Entity"
      @click="showDialog = true"
    />
    <q-table
      class="full-width q-mt-md"
      :columns="columns"
      :rows="app.entities"
      @row-click="(_, row: IEntity) => editEntity(row)"
    />
    <EntitiesModal
      :show="showDialog"
      :on-close="() => (showDialog = false)"
      :on-save="saveEntity"
      :entity="entityInDialog"
    />
  </div>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { ref } from 'vue';
import EntitiesModal from './EntitiesModal.vue';
import { IField } from 'src/models/Field';
import { useAppStore } from 'src/stores/app';
import { IEntity } from 'src/models/Entity';

const app = useAppStore();

const showDialog = ref<boolean>(false);
const entityInDialog = ref<IEntity | undefined>(undefined);

function editEntity(entity: IEntity) {
  entityInDialog.value = entity;
  showDialog.value = true;
}

function saveEntity(name: string, fields: IField[]) {
  if (entityInDialog.value !== undefined) {
    const entityIndex = app.entities.findIndex(
      (el) => el.name === entityInDialog.value?.name
    );
    app.entities[entityIndex].name = name;
    app.entities[entityIndex].fields = fields;

    if (entityInDialog.value.name !== name) {
      app.entities.forEach((entity) => {
        entity.relationships.forEach((relationship) => {
          if (relationship.otherEntityName === entityInDialog.value?.name) {
            relationship.otherEntityName = name;
          }
        });
      });
    }

    entityInDialog.value = undefined;
    return;
  }

  app.addEntity({
    name,
    fields,
    relationships: [],
  });
}

const columns: QTableColumn[] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'fields',
    label: 'Fields',
    field: 'fields',
    format(val, row) {
      return row.fields.length;
    },
  },
  {
    name: 'relationships',
    label: 'Relationships',
    field: 'relationships',
    format(val, row) {
      return row.relationships.length;
    },
  },
];
</script>
