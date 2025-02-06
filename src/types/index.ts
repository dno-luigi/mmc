export type AIModel = 'openai' | 'deepseek' | 'claude' | 'openrouter';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model: AIModel;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: AIModel;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  role: 'free' | 'paid';
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  error: string | null;
}
