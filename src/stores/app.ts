import { defineStore } from 'pinia';
import { IKipApp } from 'src/models/KipApp';
import { IProcess } from 'src/models/Process';
import { IEntity } from 'src/models/Entity';
import { IRelationship } from 'src/models/Relationship';
import { IInputItem } from 'src/models/TaskForm';

export const useAppStore = defineStore('app', {
  state: (): IKipApp => {
    const currentApp: IKipApp | null = localStorage.getItem('currentApp')
      ? JSON.parse(localStorage.getItem('currentApp') as string)
      : null;

    return {
      name: currentApp?.name ?? '',
      packageName: currentApp?.packageName ?? '',
      languages: currentApp?.languages ?? [],
      database: currentApp?.database ?? '',
      entities: currentApp?.entities ?? [],
      processes: currentApp?.processes ?? [],
    };
  },
  getters: {},
  actions: {
    setAppInfo(
      name: string,
      packageName: string,
      languages: string[],
      database: string
    ) {
      this.name = name;
      this.packageName = packageName;
      this.languages = languages;
      this.database = database;
    },
    setProcesses(processes: IProcess[]) {
      this.processes = processes;
    },
    resetProcesses() {
      this.processes = [];
    },
    resetApp() {
      this.name = '';
      this.packageName = '';
      this.languages = [];
      this.database = '';
      this.entities = [];
      this.processes = [];
    },
    setProcessBindingForProcess(processBpmnId: string, entity: IEntity) {
      const process = this.processes.find(
        (process) => process.processBpmnId === processBpmnId
      );
      if (process) {
        process.processBinding = entity;
      }
    },
    addEntity(entity: IEntity) {
      this.entities.push(entity);
    },
    updateEntitiesRelationships(
      relationships: (IRelationship & { entityName: string })[]
    ) {
      this.entities.forEach((entity) => {
        entity.relationships = relationships.filter(
          (relationship) => relationship.entityName === entity.name
        );
      });
    },
    setTaskFormInputItems(formName: string, inputItems: IInputItem[]) {
      this.processes[0].taskForms.forEach((taskForm) => {
        if (taskForm.name === formName) {
          taskForm.inputItems = inputItems;
          return;
        }
      });
    },
    setStartFormInputItems(inputItems: IInputItem[]) {
      this.processes[0].startForm.inputItems = inputItems;
    },
  },
});
