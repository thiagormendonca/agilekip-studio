import { IKipApp } from 'src/models/KipApp';
import templates from 'src/templates';
import { IProcess } from 'src/models/Process';
import { IEntity } from 'src/models/Entity';
import JSZip from 'jszip';

interface IFile {
  file: any;
  type: string;
  name: string;
}

function buildFile(file: any, type: string, name: string): IFile {
  return {
    file,
    type,
    name,
  };
}

function downloadFile(file: any, type: string, name: string) {
  const blob = new Blob([file], { type });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

function zipAndDownloadFiles(files: IFile[]) {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.file);
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    downloadFile(content, 'application/zip', 'app.zip');
  });
}

function createJDLFile(app: IKipApp) {
  const jdlFile = templates.jdl(
    app.name,
    app.packageName,
    app.languages,
    app.database
  );

  return buildFile(jdlFile, 'text/plain', `${app.name}.jdl`);
}

function createUserTaskFiles(process: IProcess) {
  const files: IFile[] = [];

  process.userTasks.forEach((task) => {
    const form = process.taskForms.find(
      (form) => form.processElementId === task.id
    );
    if (!form) return;

    const taskFile = templates.taskForm(process, task, form);

    files.push(buildFile(taskFile, 'application/json', `${task.name}.json`));
  });

  return files;
}

function createStartFormFiles(process: IProcess) {
  const startFormFile = templates.taskForm(
    process,
    process.startEvent,
    process.startForm
  );

  return buildFile(
    startFormFile,
    'application/json',
    `${process.startEvent.name}.json`
  );
}

function createEntityFiles(entities: IEntity[]) {
  return entities.map((entity) => {
    const entityFile = templates.entity(entity);

    return buildFile(entityFile, 'application/json', `${entity.name}.json`);
  });
}

export function createAppFiles(app: IKipApp) {
  const files: IFile[] = [];

  files.push(createJDLFile(app));
  app.processes
    .map(createUserTaskFiles)
    .forEach((taskFiles) => taskFiles.forEach((file) => files.push(file)));
  app.processes.map(createStartFormFiles).forEach((file) => files.push(file));
  createEntityFiles(app.entities).forEach((file) => files.push(file));

  zipAndDownloadFiles(files);
}
