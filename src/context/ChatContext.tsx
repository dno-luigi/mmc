import { createContext, useContext, useState, ReactNode } from 'react';
import { ChatState, Conversation, Message, AIModel } from '../types';
import { aiService } from '../services/ai';

interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  setModel: (model: AIModel) => void;
  clearConversation: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChatState>({
    conversations: [],
    currentConversation: null,
    loading: false,
    error: null,
  });

  const generateId = () => Math.random().toString(36).substring(2);

  const createConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      model: 'openai',
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      conversations: [newConversation, ...prev.conversations],
      currentConversation: newConversation,
    }));
  };

  const selectConversation = (id: string) => {
    const conversation = state.conversations.find(conv => conv.id === id);
    if (conversation) {
      setState(prev => ({ ...prev, currentConversation: conversation }));
    }
  };

  const deleteConversation = (id: string) => {
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.filter(conv => conv.id !== id),
      currentConversation:
        prev.currentConversation?.id === id ? null : prev.currentConversation,
    }));
  };

  const setModel = (model: AIModel) => {
    if (state.currentConversation) {
      const updatedConversation = {
        ...state.currentConversation,
        model,
      };

      setState(prev => ({
        ...prev,
        currentConversation: updatedConversation,
        conversations: prev.conversations.map(conv =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        ),
      }));
    }
  };

  const sendMessage = async (content: string) => {
    if (!state.currentConversation) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        model: state.currentConversation.model,
        timestamp: new Date().toISOString(),
      };

      // Convert conversation history to format expected by AI service
      const conversationHistory = state.currentConversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send message to AI service with conversation history
      const aiResponse = await aiService.sendMessage(
        content,
        state.currentConversation.model,
        conversationHistory
      );

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: aiResponse.content,
        model: state.currentConversation.model,
        timestamp: new Date().toISOString(),
      };

      const updatedConversation = {
        ...state.currentConversation,
        messages: [...state.currentConversation.messages, userMessage, assistantMessage],
      };

      setState(prev => ({
        ...prev,
        loading: false,
        error: aiResponse.error || null,
        currentConversation: updatedConversation,
        conversations: prev.conversations.map(conv =>
          conv.id === updatedConversation.id ? updatedConversation : conv
        ),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to send message',
      }));
    }
  };

  const clearConversation = () => {
    if (state.currentConversation) {
      const clearedConversation = {
        ...state.currentConversation,
        messages: [],
      };

      setState(prev => ({
        ...prev,
        currentConversation: clearedConversation,
        conversations: prev.conversations.map(conv =>
          conv.id === clearedConversation.id ? clearedConversation : conv
        ),
      }));
    }
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        sendMessage,
        createConversation,
        selectConversation,
        deleteConversation,
        setModel,
        clearConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
