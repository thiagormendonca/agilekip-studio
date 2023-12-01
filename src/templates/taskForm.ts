import { ModelElement } from 'src/models/ModelElement';
import { IProcess } from 'src/models/Process';
import { ITaskForm } from 'src/models/TaskForm';

export default (process: IProcess, element: ModelElement, form: ITaskForm) =>
  JSON.stringify({
    fields: form.inputItems.map((item) => ({
      fieldName: item.fieldNameRef,
      fieldType: item.fieldType,
      fieldReadOnly: item.readonly,
    })),
    relationships: [],
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
