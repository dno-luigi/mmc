import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { FiUser, FiCpu } from 'react-icons/fi';
import { Components } from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const components: Components = {
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      return (
        <code
          className={`${className || ''} ${
            inline
              ? 'bg-gray-100 rounded px-1'
              : 'block bg-gray-100 p-2 rounded-lg overflow-x-auto'
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => <pre className="bg-transparent p-0">{children}</pre>,
  };

  return (
    <div
      className={`message ${
        isUser ? 'user-message' : 'assistant-message'
      } flex gap-4 max-w-4xl mx-auto p-4 hover:bg-gray-50 transition-colors`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          {isUser ? (
            <FiUser className="text-blue-600" />
          ) : (
            <FiCpu className="text-gray-600" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown components={components}>{message.content}</ReactMarkdown>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          <span className="capitalize flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            {message.model}
          </span>
        </div>
      </div>
    </div>
  );
}
