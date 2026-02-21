import { useAutoScroll } from "../hooks/useAutoScroll"
import { ChatMessage } from "./ChatMessage"

import "./ChatMessages.css"

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        const { sender, message, id, time } = chatMessage;
        return <ChatMessage sender={sender} message={message} key={id} time={time} />;
      })}
    </div>
  );
}