import { IRelationship } from './Relationship';

export interface ITaskForm {
  name: string;
  type: 'user-task-form' | 'start-form';
  processElementId: string;
  inputItems: IInputItem[];
  relationships: IRelationship[];
}

export interface IInputItem {
  fieldNameRef: string;
  readonly: boolean;
  required: boolean;
}
