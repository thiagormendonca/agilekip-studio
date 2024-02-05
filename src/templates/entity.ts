import { IEntity } from 'src/models/Entity';
import { IField, IValidationRules } from 'src/models/Field';
import { ModelElement } from 'src/models/ModelElement';
import { IRelationship } from 'src/models/Relationship';

interface IEntityField {
  fieldName: string;
  fieldType: string;
  fieldValidateRules?: string[];
  fieldValidateRulesPattern?: string;
  fieldValidateRulesMinlength?: number;
  fieldValidateRulesMaxlength?: number;
  fieldValidateRulesMinbytes?: number;
  fieldValidateRulesMaxbytes?: number;
}

function getRulesDifferentThanDefault(rules: IValidationRules) {
  const defaultRules: IValidationRules = {
    readonly: false,
    required: false,
    unique: false,
    pattern: '',
    minlength: undefined,
    maxlength: undefined,
    minbytes: undefined,
    maxbytes: undefined,
  };

  return (Object.keys(rules) as Array<keyof typeof rules>).filter((rule) => {
    return rules[rule] !== defaultRules[rule];
  });
}

function generateEntityFields(fields: IField[]) {
  return fields.map((field) => {
    const entityField: IEntityField = {
      fieldName: field.name,
      fieldType: field.fieldType,
    };

    const rules = field.rules;

    // make sure that minlength and maxlength are not set at the same time as min and max
    if (field.fieldType === 'Integer') {
      if (rules.maxlength !== undefined) {
        if (rules.max === undefined) {
          rules.max = rules.maxlength;
        }
        rules.maxlength = undefined;
      }
      if (rules.minlength !== undefined) {
        if (rules.min === undefined) {
          rules.min = rules.minlength;
        }
        rules.minlength = undefined;
      }
    } else {
      if (rules.max !== undefined) {
        if (rules.maxlength === undefined) {
          rules.maxlength = rules.max;
        }
        rules.max = undefined;
      }
      if (rules.min !== undefined) {
        if (rules.minlength === undefined) {
          rules.minlength = rules.min;
        }
        rules.min = undefined;
      }
    }

    const settedRules = getRulesDifferentThanDefault(rules);

    const specialRules = [
      'pattern',
      'minlength',
      'maxlength',
      'minbytes',
      'maxbytes',
      'min',
      'max',
    ];

    if (settedRules) {
      entityField.fieldValidateRules = settedRules;

      // set rules that need a value
      settedRules
        .filter((rule) => specialRules.includes(rule))
        .forEach((rule) => {
          const objIndex = `fieldValidateRules${
            rule.charAt(0).toUpperCase() + rule.slice(1)
          }` as keyof typeof entityField;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          entityField[objIndex] = field.rules[rule]?.toString();
        });
    }

    return entityField;
  });
}

export function getEntityRelationshipsFromRelationships(
  relationships: IRelationship[]
) {
  return relationships.map((relationship) => ({
    relationshipName: relationship.relationshipName,
    relationshipType: relationship.relationshipType,
    otherEntityName: relationship.otherEntityName,
    otherEntityField: relationship.otherEntityField,
    relationshipValidateRules: relationship.required ? ['required'] : [],
  }));
}

export default (
  entity: IEntity,
  type: 'domain' | 'process-binding',
  element?: ModelElement,
  domainEntityName?: string
) => {
  const template = {
    fields: generateEntityFields(entity.fields),
    relationships: getEntityRelationshipsFromRelationships(
      entity.relationships
    ),
    name: entity.name,
    entityType: type,
    service: 'serviceClass',
    dto: 'mapstruct',
    jpaMetamodelFiltering: false,
    fluentMethods: true,
    readOnly: false,
    embedded: false,
    applications: '*',
    skipFakeData: true,
    pagination: 'no',
  };

  if (type === 'process-binding') {
    return JSON.stringify({
      ...template,
      processBpmnId: element?.id,
      domainEntityName: domainEntityName,
    });
  }

  return JSON.stringify(template);
};
