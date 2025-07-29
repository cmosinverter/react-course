import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {

  const [chatMessages, setChatMessages] = useState([{
    message: "hello chatbot",
    sender: "user",
    id: "id1"
  }, {
    message: "how can i ,help you",
    sender: "robot",
    id: "id2"
  }, {
    message: "i need help with my homework",
    sender: "user",
    id: "id3"
  }, {
    message: "sure, what subject?",
    sender: "robot",
    id: "id4"
  }]);

  return (
    <div className="app-container">
      
      <ChatMessages 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
