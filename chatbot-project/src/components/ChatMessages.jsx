import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({chatMessages}) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }

  }, [chatMessages]);

  return (
    <div className="chat-messages-contaner" ref={chatMessagesRef}>
      {chatMessages.map((message) => {
        return (
          <ChatMessage 
            message={message.message} 
            sender={message.sender}
            time={message.time}
            key={message.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;