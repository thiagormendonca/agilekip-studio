import { IEntity } from './Entity';
import { IProcess } from './Process';

export interface IKipApp {
  name: string;
  packageName: string;
  languages: string[];
  database: string;
  entities: IEntity[];
  processes: IProcess[];
}
