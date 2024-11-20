import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
  options?: { value: string; label: string }[];
}

interface FormPreviewProps {
  schema: {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  };
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<any>(null); // Store form data for download

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    setFormData(data); // Save form data for downloading
  };

  // Function to download form data as JSON
  const downloadJSON = () => {
    if (formData) {
      const dataStr = JSON.stringify(formData, null, 2); // Format with 2-space indentation
      const blob = new Blob([dataStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${schema.formTitle.replace(/\s+/g, '_').toLowerCase()}.json`; // Filename based on form title
      link.click();
    } else {
      alert('No form data to download!');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full md:w-3/4 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{schema.formTitle}</h1>
      <p className="text-gray-600 mb-6">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {schema.fields.map((field: Field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
              <input
                className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern ? {
                    value: new RegExp(field.validation.pattern),
                    message: field.validation.message || 'Invalid format',
                  } : undefined,
                })}
              />
            ) : field.type === 'select' ? (
              <select
                className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register(field.id, { required: field.required })}
              >
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div className="flex flex-col space-y-2">
                {field.options?.map(option => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: field.required })}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : null}
            {errors[field.id] && (
              <p className="text-sm text-red-600">
                {field.validation?.message || 'This field is required'}
              </p>
            )}
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>

      {formData && (
        <div className="mt-6 text-center">
          <button
            onClick={downloadJSON}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Download Form Data as JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPreview;
