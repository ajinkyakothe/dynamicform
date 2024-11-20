import React, { useState } from 'react';

interface JSONEditorProps {
  setFormData: (formData: string) => void;
  theme: string; // Accept theme as a prop
}

const JSONEditor: React.FC<JSONEditorProps> = ({ setFormData, theme }) => {
  const [jsonInput, setJsonInput] = useState<string>(''); // State for JSON input

  // Handle JSON input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setFormData(e.target.value); // Update parent component with the new JSON
  };

  return (
    <div className={`h-50%  p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <textarea
        value={jsonInput}
        onChange={handleChange}
        placeholder="Enter your JSON schema here"
        rows={10}
        className={`w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      />
    </div>
  );
};

export default JSONEditor;
