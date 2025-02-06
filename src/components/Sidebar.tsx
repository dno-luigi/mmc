import { useChat } from '../context/ChatContext';
import { AIModel } from '../types';
import { FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { Settings } from './Settings';

const models: { value: AIModel; label: string }[] = [
  { value: 'openai', label: 'OpenAI GPT-4' },
  { value: 'claude', label: 'Anthropic Claude' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'openrouter', label: 'OpenRouter' },
];

export function Sidebar() {
  const {
    conversations,
    currentConversation,
    createConversation,
    selectConversation,
    deleteConversation,
    setModel,
    clearConversation,
  } = useChat();

  return (
    <div className="sidebar flex flex-col h-full">
      <button
        onClick={createConversation}
        className="flex items-center justify-center gap-2 w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        <FiPlus /> New Chat
      </button>

      <div className="flex gap-2 mb-4">
        <select
          value={currentConversation?.model || 'openai'}
          onChange={(e) => setModel(e.target.value as AIModel)}
          className="model-selector flex-1"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>

        {currentConversation && (
          <button
            onClick={clearConversation}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <FiRefreshCw />
          </button>
        )}

        <Settings />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
              currentConversation?.id === conversation.id
                ? 'bg-gray-100 border-l-4 border-blue-500'
                : ''
            }`}
            onClick={() => selectConversation(conversation.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {conversation.title || 'New Chat'}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{new Date(conversation.timestamp).toLocaleDateString()}</span>
                <span className="capitalize">{conversation.model}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(conversation.id);
              }}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-200 rounded-full transition-colors"
              title="Delete conversation"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
