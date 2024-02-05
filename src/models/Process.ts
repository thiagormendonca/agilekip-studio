import { IStartEvent, IUserTask, ModelElement } from './ModelElement';
import { ITaskForm } from './TaskForm';
import { IEntity } from './Entity';

export interface IProcess {
  model: ModelElement;
  processBpmnId: string;
  startEvent: IStartEvent;
  userTasks: IUserTask[];
  processBinding: IEntity;
  startForm: ITaskForm;
  taskForms: ITaskForm[];
}
