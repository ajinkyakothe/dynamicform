

import { Field } from '../components/FormField';

// Function to validate form data based on the schema
export const validateFormData = (data: any, schema: Field[]) => {
  const errors: any = {};

  // Iterate through the schema to validate each field
  schema.forEach((field) => {
    const fieldData = data[field.id];

    // Check for required fields
    if (field.required && !fieldData) {
      errors[field.id] = 'This field is required';
    }

    // Check for pattern validation if provided
    if (field.validation?.pattern && fieldData) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(fieldData)) {
        errors[field.id] = field.validation.message || 'Invalid format';
      }
    }
  });

  return errors;
};

// Function to format data for form submission (optional utility)
export const formatFormData = (data: any) => {
  // This is where you can add any formatting logic for submission
  return data;
};
