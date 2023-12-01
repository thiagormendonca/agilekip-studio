import { IKipApp } from 'src/models/KipApp';
import templates from 'src/templates';
import { IProcess } from 'src/models/Process';
import { IEntity } from 'src/models/Entity';

function downloadFile(file: any, type: string, name: string) {
  const blob = new Blob([file], { type });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

function createJDLFile(app: IKipApp) {
  const jdlFile = templates.jdl(
    app.name,
    app.packageName,
    app.languages,
    app.database
  );

  downloadFile(jdlFile, 'text/plain', `${app.name}.jdl`);
}

function createUserTaskFiles(process: IProcess) {
  process.userTasks.forEach((task) => {
    const form = process.taskForms.find(
      (form) => form.processElementId === task.id
    );
    if (!form) return;

    const taskFile = templates.taskForm(process, task, form);

    downloadFile(taskFile, 'application/json', `${task.name}.json`);
  });
}

function createStartFormFiles(process: IProcess) {
  const startFormFile = templates.taskForm(
    process,
    process.startEvent,
    process.startForm
  );

  downloadFile(
    startFormFile,
    'application/json',
    `${process.startEvent.name}.json`
  );
}

function createEntityFiles(entities: IEntity[]) {
  entities.forEach((entity) => {
    const entityFile = templates.entity(entity);

    downloadFile(entityFile, 'application/json', `${entity.name}.json`);
  });
}

export function createAppFiles(app: IKipApp) {
  createJDLFile(app);
  app.processes.forEach(createUserTaskFiles);
  app.processes.forEach(createStartFormFiles);
  createEntityFiles(app.entities);
}
