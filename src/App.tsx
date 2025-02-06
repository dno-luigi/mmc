import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { Chat } from './components/Chat';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
