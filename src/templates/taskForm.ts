import { IEntity } from 'src/models/Entity';
import { ModelElement } from 'src/models/ModelElement';
import { IProcess } from 'src/models/Process';
import { ITaskForm } from 'src/models/TaskForm';
import { getEntityRelationshipsFromRelationships } from './entity';

function getFieldTypeFromEntity(entity: IEntity, fieldName: string) {
  return entity.fields.find((field) => field.name === fieldName)?.fieldType;
}

function getRelationshipFromEntity(entity: IEntity, relationshipName: string) {
  return entity.relationships.find(
    (relationship) => relationship.relationshipName === relationshipName
  );
}

export default (process: IProcess, element: ModelElement, form: ITaskForm) =>
  JSON.stringify({
    fields: form.inputItems
      .filter((item) => !item.fieldNameRef.startsWith('Relationship'))
      .map((item) => ({
        fieldName: item.fieldNameRef,
        fieldType: getFieldTypeFromEntity(
          process.processBinding,
          item.fieldNameRef
        ),
        fieldReadOnly: item.readonly,
        fieldValidateRules: item.required ? ['required'] : [],
      })),
    relationships: form.inputItems
      .filter((item) => item.fieldNameRef.startsWith('Relationship'))
      .map((item) => {
        const replacedFieldName = item.fieldNameRef.replace(
          'Relationship ',
          ''
        );
        const relationship = getRelationshipFromEntity(
          process.processBinding,
          replacedFieldName
        );

        if (!relationship) return;

        return getEntityRelationshipsFromRelationships([relationship])[0];
      }),
    name: element.name,
    entityType: form.type,
    processBpmnId: process.processBpmnId,
    processEntityName: process.processBinding.name, // n sei se ta certo 'TravelPlanBinding'
    taskBpmnId: element.id,
    domainEntityName: process.processBinding.name, // n sei se o domain entity ta nessa propriedade
    service: 'serviceClass',
    dto: 'mapstruct',
    jpaMetamodelFiltering: false,
    readOnly: false,
    pagination: 'no',
    skipFakeData: true,
  });
