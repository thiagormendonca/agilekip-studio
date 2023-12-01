import { IEntity } from 'src/models/Entity';

export default (entity: IEntity) =>
  JSON.stringify({
    fields: entity.fields.map((field) => ({
      fieldName: field.name,
      fieldType: field.fieldType,
      fieldValidateRules: field.rules,
    })),
    relationships: entity.relationships.map((relationship) => ({
      relationshipName: relationship.relationshipName,
      relationshipType: relationship.relationshipType,
      otherEntityName: relationship.otherEntityName,
      otherEntityField: relationship.otherEntityField,
    })),
    name: entity.name,
    entityType: 'domain',
    service: 'serviceClass',
    dto: 'mapstruct',
    jpaMetamodelFiltering: false,
    fluentMethods: true,
    readOnly: false,
    embedded: false,
    applications: '*',
    skipFakeData: true,
    pagination: 'no',
  });
