import { IStartEvent, IUserTask } from './ModelElement';
import { ITaskForm } from './TaskForm';
import { IEntity } from './Entity';

export interface IProcess {
  model: string;
  processBpmnId: string;
  startEvent: IStartEvent;
  userTasks: IUserTask[];
  processBinding: IEntity;
  startForm: ITaskForm;
  taskForms: ITaskForm[];
}
