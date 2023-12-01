export interface IField {
  name: string;
  fieldType: FieldType;
  rules?: IValidationRules;
}

export interface IValidationRules {
  readonly?: boolean;
  required?: boolean;
  unique?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  minbytes?: number;
  maxbytes?: number;
}

export enum FieldType {
  LocalDate = "LocalDate",
  String = "String",
  Integer = "Integer",
  Long = "Long",
  BigDecimal = "BigDecimal",
  Float = "Float",
  Double = "Double",
  Enum = "Enum",
  Boolean = "Boolean",
  ZonedDateTime = "ZonedDateTime",
  Instant = "Instant",
  Duration = "Duration",
  UUID = "UUID",
  Blob = "Blob",
  AnyBlob = "AnyBlob",
  ImageBlob = "ImageBlob",
  TextBlob = "TextBlob",
}
