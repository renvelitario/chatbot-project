import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";

import { ChatInput } from "./assets/components/ChatInput";
import { ChatMessages } from "./assets/components/ChatMessages";

import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  useEffect(() => {
    Chatbot.addResponses({
      Goodbye: "Goodbye. Have a great day!",
      "give me a unique id": () =>
        `Sure! Here's a unique ID: ${crypto.randomUUID()}`,
      "who are you": "I'm a chatbot created using React by Ren.",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome">Hi, how can I help you today?</p>
      )}

      <ChatMessages chatMessages={chatMessages} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;