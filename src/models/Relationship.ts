export interface IRelationship {
  relationshipName: string;
  relationshipType:
    | 'one-to-one'
    | 'one-to-many'
    | 'many-to-one'
    | 'many-to-many';
  otherEntityName: string;
  otherEntityField: string;
  required: boolean;
}
