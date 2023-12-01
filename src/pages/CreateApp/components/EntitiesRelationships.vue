<template>
  <div class="fit">
    <div>
      <p>Add Relationships to your Entities</p>
      <q-btn
        class="q-mt-md"
        color="secondary"
        label="Add Relationship"
        @click="addRelationship"
        :disable="app.entities.length < 2"
      >
        <q-tooltip v-if="app.entities.length < 2">
          Add at least 2 Entities</q-tooltip
        >
      </q-btn>
    </div>
    <div v-if="app.entities.length > 1">
      <div
        v-for="(relationship, index) in relationships"
        :key="index"
        class="row q-col-gutter-sm items-center q-my-sm"
      >
        <SelectInput
          class="col"
          v-model="relationship.entityName"
          :options="app.entities.map((entity) => entity.name)"
        />
        <SelectInput
          class="col"
          v-model="relationship.relationshipType"
          :options="relationshipTypes"
        />
        <SelectInput
          class="col"
          v-model="relationship.otherEntityName"
          :options="app.entities.map((entity) => entity.name)"
        />
        <TextInput
          class="col"
          v-model="relationship.otherEntityField"
          lazy-rules
          :rules="[(val) => !!val || 'Required']"
        />
        <q-btn
          flat
          round
          dense
          icon="delete"
          @click="removeRelationship(index)"
        />
      </div>
    </div>
    <div class="mermaid" v-html="mermaidDiagramSvg"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import mermaid from 'mermaid';
import SelectInput from 'src/components/SelectInput.vue';
import TextInput from 'src/components/TextInput.vue';
import { IRelationship } from 'src/models/Relationship';
import { useAppStore } from 'src/stores/app';

const app = useAppStore();

const relationshipTypes = ['OneToOne', 'OneToMany', 'ManyToOne', 'ManyToMany'];

const emptyRelationship = {
  entityName: '',
  relationshipName: '',
  relationshipType: '' as IRelationship['relationshipType'],
  otherEntityName: '',
  otherEntityField: '',
};

const relationships = ref<(IRelationship & { entityName: string })[]>([
  structuredClone(emptyRelationship),
]);

const mermaidDiagramSvg = ref<string>('');
const mermaidDiagramString = ref<string>('');

function updateMermaidString() {
  const mermaidDiagramBody = app.entities
    .map((entity) => {
      const relationships = entity.relationships.map((relationship) => {
        const otherEntity = app.entities.find(
          (entity) => entity.name === relationship.otherEntityName
        );
        if (!otherEntity) return '';
        return `${entity.name.toUpperCase()} ${
          relationship.relationshipType === 'OneToOne' ||
          relationship.relationshipType === 'OneToMany'
            ? '||'
            : '}|'
        }--${
          relationship.relationshipType === 'OneToOne' ||
          relationship.relationshipType === 'ManyToOne'
            ? '||'
            : '|{'
        } ${otherEntity.name.toUpperCase()} : ""`;
      });
      return relationships.join(' ').trim()
        ? relationships.join(' ')
        : entity.name.toUpperCase();
    })
    .join(' ');

  const mermaidString = 'erDiagram\n' + mermaidDiagramBody;

  if (mermaidDiagramString.value === mermaidString) return;

  mermaid.render('diagramDiv', mermaidString).then(({ svg }) => {
    mermaidDiagramSvg.value = svg;
    mermaidDiagramString.value = mermaidString;
  });
}

function addRelationship() {
  relationships.value.push(structuredClone(emptyRelationship));
}

function removeRelationship(index: number) {
  relationships.value.splice(index, 1);

  if (relationships.value.length === 0) {
    relationships.value.push(structuredClone(emptyRelationship));
  }
}

function updateModelValue() {
  app.updateEntitiesRelationships(relationships.value);
}

watch(
  relationships,
  () => {
    updateModelValue();
  },
  { deep: true }
);

watch(() => app.entities, updateMermaidString, {
  deep: true,
  immediate: true,
});
</script>
