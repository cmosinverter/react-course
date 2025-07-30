import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    // Dont allow sending if textbox is empty
    if (inputText.trim() === '' || isLoading) {
      return;
    }
    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        time: dayjs().valueOf(),
        id: crypto.randomUUID()
      }
    ];
  
    
    const chatbotInputText = inputText;
    setInputText('');

    setChatMessages(newChatMessages);


    setIsLoading(true);
    setChatMessages([
      ...newChatMessages,
      {
        message: "Loading...",
        sender: "robot",
        time: dayjs().valueOf(),
        id: crypto.randomUUID()
      }
    ]);
    const response = await Chatbot.getResponseAsync(chatbotInputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        time: dayjs().valueOf(),
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(false);

    
  }

  function inputKeyboardHandler(event) {
      if (event.key === 'Enter') {
        sendMessage();
      } else if (event.key === 'Escape') {
        setInputText('');
      } else {
        return;
      }
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a meassage to Chatbot" 
        size="30"
        onKeyDown={inputKeyboardHandler}
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className='send-button'
      >Send</button>
    </div>
  );
}
