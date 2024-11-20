import React, { useState, useEffect } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null); // Store the form schema data
  const [theme, setTheme] = useState<string>('light'); // Theme state

  // Handle light/dark theme toggle
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleFormDataChange = (newFormData: any) => {
    try {
      const parsedData = JSON.parse(newFormData);
      setFormData(parsedData); // Update form data state with parsed JSON
    } catch (error) {
      console.error('Invalid JSON', error);
      alert('Please enter a valid JSON.');
    }
  };

  // Apply theme to body class
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-green-400', 'text-gray-800');
    } else {
      document.body.classList.add('bg-green-400', 'text-gray-800');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  }, [theme]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-green-400'}`}>
      {/* JSON Editor on the left side */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Edit JSON Schema</h2>
        <JSONEditor setFormData={handleFormDataChange} theme={theme} /> {/* Pass theme */}
      </div>

      {/* Form Preview on the right side */}
      <div className="w-full md:w-1/2 p-4">
        {formData ? (
          <FormPreview schema={formData} />
        ) : (
          <div className="flex justify-center items-center h-full text-lg text-gray-700">
            <p>Please enter a JSON schema to preview the form.</p>
          </div>
        )}
      </div>

      {/* Light/Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default App;
