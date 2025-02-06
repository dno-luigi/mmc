import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    try {
      await sendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container max-w-4xl mx-auto">
      <div className="relative flex items-end gap-2 p-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={loading ? 'AI is thinking...' : 'Type a message...'}
          className="chat-input min-h-[50px] py-3 pr-12 resize-none"
          disabled={loading}
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className={`absolute right-4 bottom-4 p-2 rounded-full transition-colors ${
            message.trim() && !loading
              ? 'text-blue-500 hover:bg-blue-50'
              : 'text-gray-300'
          }`}
          title={loading ? 'AI is thinking...' : 'Send message'}
        >
          <FiSend className={loading ? 'opacity-50' : ''} />
        </button>
      </div>
      <div className="px-4 pb-2">
        <p className="text-xs text-gray-500">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </form>
  );
}
