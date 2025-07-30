import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { Chatbot } from 'supersimpledev';
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye! Have a great day!',
      'tell me a joke': 'Why did the scarecrow win an award? Because he was outstanding in his field!',
    })
  }, []);

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || [{
    message: "hello chatbot",
    sender: "user",
    time: 1736127288920,
    id: "id1"
  }, {
    message: "how can i ,help you",
    sender: "robot",
    time: 1736127291230,
    id: "id2"
  }, {
    message: "i need help with my homework",
    sender: "user",
    time: 1736127292230,
    id: "id3"
  }, {
    message: "sure, what subject?",
    sender: "robot",
    time: 1736127292240,
    id: "id4"
  }]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages])

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
