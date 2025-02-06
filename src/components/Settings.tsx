import { useState, useEffect } from 'react';
import { AIModel } from '../types';
import { FiSettings, FiX, FiEye, FiEyeOff } from 'react-icons/fi';

interface APIKeys {
  openai: string;
  claude: string;
  deepseek: string;
  openrouter: string;
}

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    openai: localStorage.getItem('openai_key') || '',
    claude: localStorage.getItem('claude_key') || '',
    deepseek: localStorage.getItem('deepseek_key') || '',
    openrouter: localStorage.getItem('openrouter_key') || '',
  });

  const handleSave = (model: AIModel, key: string) => {
    setApiKeys(prev => ({ ...prev, [model]: key }));
    localStorage.setItem(`${model}_key`, key);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="API Settings"
      >
        <FiSettings />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">API Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowKeys(!showKeys)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  {showKeys ? (
                    <>
                      <FiEyeOff /> Hide Keys
                    </>
                  ) : (
                    <>
                      <FiEye /> Show Keys
                    </>
                  )}
                </button>
              </div>

              {(Object.keys(apiKeys) as AIModel[]).map(model => (
                <div key={model} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {model} API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKeys ? 'text' : 'password'}
                      value={apiKeys[model]}
                      onChange={(e) => handleSave(model, e.target.value)}
                      placeholder={`Enter your ${model} API key`}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {apiKeys[model]
                      ? 'API key is set'
                      : `No API key set for ${model}`}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>API keys are stored securely in your browser's local storage.</p>
              <p>They are never sent to our servers.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
