export interface IRelationship {
  relationshipName: string;
  relationshipType: 'OneToOne' | 'OneToMany' | 'ManyToOne' | 'ManyToMany';
  otherEntityName: string;
  otherEntityField: string;
  required: boolean;
}
