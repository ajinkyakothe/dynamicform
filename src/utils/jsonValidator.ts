
import { FormSchema, Field } from '../components/FormField';

// Function to validate the structure of the JSON schema
export const validateJsonSchema = (schema: any): string[] => {
  const errors: string[] = [];

  // Check if the formTitle and formDescription are present
  if (!schema.formTitle || typeof schema.formTitle !== 'string') {
    errors.push('formTitle is required and must be a string');
  }

  if (!schema.formDescription || typeof schema.formDescription !== 'string') {
    errors.push('formDescription is required and must be a string');
  }

  // Check if the fields array is valid
  if (!Array.isArray(schema.fields)) {
    errors.push('fields must be an array');
  } else {
    // Validate each field in the fields array
    schema.fields.forEach((field: Field, index: number) => {
      if (!field.id || typeof field.id !== 'string') {
        errors.push(`Field ${index + 1}: id is required and must be a string`);
      }
      if (!field.label || typeof field.label !== 'string') {
        errors.push(`Field ${index + 1}: label is required and must be a string`);
      }
      if (!field.type || !['text', 'email', 'select', 'radio', 'textarea'].includes(field.type)) {
        errors.push(`Field ${index + 1}: type must be one of 'text', 'email', 'select', 'radio', or 'textarea'`);
      }
      if (field.required === undefined) {
        errors.push(`Field ${index + 1}: required property is required`);
      }
    });
  }

  return errors;
};
