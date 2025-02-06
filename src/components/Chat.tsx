import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { Sidebar } from './Sidebar';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';

export function Chat() {
  const { currentConversation, loading, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        {currentConversation && (
          <div className="border-b px-4 py-2 bg-white">
            <h2 className="text-lg font-medium">
              Chat with {currentConversation.model.charAt(0).toUpperCase() + currentConversation.model.slice(1)}
            </h2>
            <p className="text-sm text-gray-500">
              {currentConversation.messages.length} messages
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto message-container">
          {currentConversation ? (
            <>
              {currentConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {loading && (
                <div className="flex items-center justify-center p-4 text-gray-500">
                  <FiLoader className="animate-spin mr-2" />
                  Thinking...
                </div>
              )}
              
              {error && (
                <div className="flex items-center justify-center p-4 text-red-500 bg-red-50 mx-4 my-2 rounded-lg">
                  <FiAlertCircle className="mr-2" />
                  {error}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <h3 className="text-xl font-medium mb-2">Welcome to AI Chat</h3>
              <p className="text-sm">Select or create a conversation to start chatting</p>
            </div>
          )}
        </div>

        {/* Input */}
        {currentConversation && (
          <div className="border-t bg-white">
            <ChatInput />
          </div>
        )}
      </div>
    </div>
  );
}
