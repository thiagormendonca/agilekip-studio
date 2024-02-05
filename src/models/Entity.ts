import { IRelationship } from './Relationship';
import { IField } from './Field';

export interface IEntity {
  name: string;
  fields: IField[];
  relationships: IRelationship[];
  isProcessBindingDomainEntity: boolean;
}
