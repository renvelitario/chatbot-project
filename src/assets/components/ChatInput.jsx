import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";

import LoadingAnimation from "../img/loading-spinner.gif";

import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText("");

    if (isLoading || inputText === "") {
      return null;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        sender: "user",
        message: inputText,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        sender: "robot",
        message: <img src={LoadingAnimation} className="loading" />,
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        sender: "robot",
        message: response,
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    setIsLoading(false);
  }

  function clearMessage() {
    setChatMessages([]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        className="input-field"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />

      <button className="send-btn" onClick={sendMessage}>
        <span className="btn-text">Send</span>
        <span className="btn-icon material-icons">send</span>
      </button>

      <button className="clear-btn" onClick={clearMessage}>
        <span className="btn-text">Clear</span>
        <span className="btn-icon material-icons">delete</span>
      </button>
    </div>
  );
}
