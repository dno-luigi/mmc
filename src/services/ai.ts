import axios from 'axios';
import { AIModel } from '../types';

interface AIResponse {
  content: string;
  error?: string;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class AIService {
  private getApiKey(model: AIModel): string | null {
    return localStorage.getItem(`${model}_key`);
  }

  private endpoints: Record<AIModel, string> = {
    openai: 'https://api.openai.com/v1/chat/completions',
    claude: 'https://api.anthropic.com/v1/messages',
    deepseek: 'https://api.deepseek.com/v1/chat/completions',
    openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  };

  private systemPrompts: Record<AIModel, string> = {
    openai: 'Jesteś pomocnym asystentem. Zawsze odpowiadaj w tym samym języku, w którym napisano pytanie. Udzielaj dokładnych i rzeczowych odpowiedzi. Jeśli pytanie jest po polsku, odpowiadaj po polsku. Zachowuj spójny styl komunikacji w całej rozmowie.',
    claude: 'You are Claude, a helpful AI assistant. Always respond in the same language as the question. Provide accurate and factual answers.',
    deepseek: 'You are a helpful AI assistant. Always respond in the same language as the question. Provide accurate and factual answers.',
    openrouter: 'You are a helpful AI assistant. Always respond in the same language as the question. Provide accurate and factual answers.',
  };

  async sendMessage(message: string, model: AIModel, conversationHistory: Message[] = []): Promise<AIResponse> {
    const apiKey = this.getApiKey(model);
    if (!apiKey) {
      return {
        content: `Please set your ${model} API key in settings to use this model.`,
        error: 'API key not configured',
      };
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Prepare messages with system prompt and history
      const messages: Message[] = [
        { role: 'system', content: this.systemPrompts[model] },
        ...conversationHistory,
        { role: 'user', content: message }
      ];

      // Set model-specific headers and request format
      switch (model) {
        case 'openai':
          headers['Authorization'] = `Bearer ${apiKey}`;
          const openaiResponse = await axios.post(
            this.endpoints[model],
            {
              model: 'gpt-4',
              messages,
              temperature: 0.7,
              presence_penalty: 0.6,
              frequency_penalty: 0.6,
              max_tokens: 1000,
            },
            { headers }
          );
          return {
            content: openaiResponse.data.choices[0].message.content,
          };

        case 'claude':
          headers['x-api-key'] = apiKey;
          headers['anthropic-version'] = '2023-06-01';
          const claudeResponse = await axios.post(
            this.endpoints[model],
            {
              model: 'claude-3-opus-20240229',
              messages,
              temperature: 0.7,
              max_tokens: 1000,
            },
            { headers }
          );
          return {
            content: claudeResponse.data.content[0].text,
          };

        case 'deepseek':
          headers['Authorization'] = `Bearer ${apiKey}`;
          const deepseekResponse = await axios.post(
            this.endpoints[model],
            {
              model: 'deepseek-chat',
              messages,
              temperature: 0.7,
              presence_penalty: 0.6,
              frequency_penalty: 0.6,
              max_tokens: 1000,
            },
            { headers }
          );
          return {
            content: deepseekResponse.data.choices[0].message.content,
          };

        case 'openrouter':
          headers['Authorization'] = `Bearer ${apiKey}`;
          const openrouterResponse = await axios.post(
            this.endpoints[model],
            {
              model: 'openai/gpt-4',
              messages,
              temperature: 0.7,
              presence_penalty: 0.6,
              frequency_penalty: 0.6,
              max_tokens: 1000,
            },
            { headers }
          );
          return {
            content: openrouterResponse.data.choices[0].message.content,
          };

        default:
          return {
            content: 'Unsupported model',
            error: 'Model not supported',
          };
      }
    } catch (error) {
      console.error(`Error with ${model} API:`, error);
      return {
        content: 'Failed to get response from AI service',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const aiService = new AIService();
