<template>
  <div>
    <div v-show="showUploader">
      <p>Upload your BPMN</p>
      <q-uploader
        style="max-width: 300px"
        label="BPMN"
        accept=".bpmn"
        :factory="uploaderFactory"
        auto-upload
        color="secondary"
      />
    </div>
    <q-btn
      class="q-mb-lg"
      v-show="!showUploader"
      color="secondary"
      label="Upload another BPMN"
      @click="resetAndShowUploader"
    />
    <div v-show="!showUploader" id="canvas"></div>
  </div>
</template>
<script setup lang="ts">
import BpmnJS from 'bpmn-js/lib/Viewer';
import { IEntity } from 'src/models/Entity';
import { IProcess } from 'src/models/Process';
import { useAppStore } from 'src/stores/app';
import { ref, watch } from 'vue';

const app = useAppStore();

const showUploader = ref(true);
const bpmnViewer = ref<BpmnJS>();

function extractProcessesFromBPMN(definitions: any) {
  const processes: IProcess[] = [];

  definitions.rootElements.forEach((element: any) => {
    if (element.$type !== 'bpmn:Process') return;

    const startEvent = element.flowElements.find(
      (el: any) => el.$type === 'bpmn:StartEvent'
    );
    const userTasks = element.flowElements.filter(
      (el: any) => el.$type === 'bpmn:UserTask'
    );

    // get user tasks from sub processes
    element.flowElements
      .filter((el: any) => el.$type === 'bpmn:SubProcess')
      .map((el: any) =>
        el.flowElements
          .filter((el: any) => el.$type === 'bpmn:UserTask')
          .map((el: any) => userTasks.push(el))
      );

    processes.push({
      model: '',
      processBpmnId: element.id,
      startEvent: {
        id: startEvent.id,
        name: startEvent.id,
      },
      userTasks: userTasks.map((el: any) => ({
        id: el.id,
        name: el.name,
      })),
      taskForms: userTasks.map((el: any) => ({
        processElementId: el.id,
        name: el.name,
        type: 'user-task-form',
        inputItems: [],
        relationships: [],
      })),
      startForm: {
        processElementId: startEvent.id,
        name: startEvent.id,
        type: 'start-form',
        inputItems: [],
        relationships: [],
      },
      processBinding: {} as IEntity,
    });
  });

  app.setProcesses(processes);
}

async function uploaderFactory(files: any) {
  showUploader.value = false;

  if (!bpmnViewer.value)
    bpmnViewer.value = new BpmnJS({
      container: '#canvas',
      height: 400,
      width: 700,
    });

  const file = files[0];
  const fileText = await file.text();

  try {
    await bpmnViewer.value.importXML(fileText);
  } catch (err) {
    console.log(err);
  }

  // make diagram fit viewport
  const canvas: any = bpmnViewer.value.get('canvas');
  canvas.zoom('fit-viewport');

  const definitions = bpmnViewer.value.getDefinitions();

  extractProcessesFromBPMN(definitions);

  return {
    url: '',
  };
}

function resetAndShowUploader() {
  app.resetApp();
  showUploader.value = true;
}

watch(
  () => app.name,
  (name) => {
    if (name) {
      showUploader.value = false;
    }
  },
  { immediate: true }
);
</script>
