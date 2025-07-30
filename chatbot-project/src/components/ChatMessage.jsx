import dayjs from 'dayjs';
import UserProfileImage from '../assets/user.png';
import PcliuProfileImage from '../assets/pcliu.JPG';
import './ChatMessage.css'

export function ChatMessage({message, sender, time}) {

  return (
    <div className={sender === "user" ? "chat-message-user": "chat-message-robot"}>
      {sender === "robot" && (
        <img src={PcliuProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        <div className="chat-message-time">
          {dayjs(time).format('HH:mm')}
        </div>
      </div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
  
};