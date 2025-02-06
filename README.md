# AI Chat Application

A modern chat application that supports multiple AI models, including OpenAI GPT-4, Anthropic Claude, DeepSeek, and OpenRouter. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🤖 Multiple AI Model Support
  - OpenAI GPT-4
  - Anthropic Claude
  - DeepSeek
  - OpenRouter

- 🔑 Easy API Key Management
  - Set API keys directly in the app
  - Secure local storage
  - Show/hide key visibility
  - Per-model key configuration

- 💬 Rich Chat Interface
  - Markdown support with syntax highlighting
  - Code block formatting
  - Real-time conversation updates
  - Auto-expanding text input

- 🎨 Modern UI/UX
  - Clean and responsive design
  - Dark mode support
  - Loading states and error handling
  - Smooth animations and transitions

- 📝 Conversation Management
  - Create new conversations
  - Switch between conversations
  - Delete conversations
  - Clear conversation history
  - Model switching within conversations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

5. Click the settings icon in the sidebar to configure your API keys:
   - OpenAI API key from [OpenAI Platform](https://platform.openai.com)
   - Claude API key from [Anthropic Console](https://console.anthropic.com)
   - DeepSeek API key from [DeepSeek Platform](https://platform.deepseek.ai)
   - OpenRouter API key from [OpenRouter](https://openrouter.ai)

## Project Structure

```
src/
├── components/          # React components
│   ├── Chat.tsx        # Main chat interface
│   ├── ChatInput.tsx   # Message input component
│   ├── ChatMessage.tsx # Individual message component
│   ├── Settings.tsx    # API key management
│   └── Sidebar.tsx     # Conversation sidebar
├── context/            # React context providers
│   ├── AuthContext.tsx # Authentication context
│   └── ChatContext.tsx # Chat state management
├── services/           # External services
│   └── ai.ts          # AI model integration
├── types/             # TypeScript type definitions
└── App.tsx            # Root component
```

## Usage

1. Configure your API keys in the settings panel
2. Create a new chat by clicking the "New Chat" button
3. Select your preferred AI model from the dropdown
4. Type your message and press Enter to send
5. Use markdown in your messages for rich text formatting
6. Use the conversation sidebar to manage your chats
7. Clear conversations or switch models at any time

## Security Note

API keys are stored securely in your browser's local storage and are never sent to our servers. All API calls are made directly from your browser to the respective AI service providers.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React for the UI framework
- Tailwind CSS for styling
- Various AI model providers for their APIs
