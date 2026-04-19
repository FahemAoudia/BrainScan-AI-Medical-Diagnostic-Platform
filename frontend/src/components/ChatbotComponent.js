import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.scss";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([{ text: "👋 Bonjour ! Comment puis-je vous aider ?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chatbot/chat/",  // ✅ Utilisation de FastAPI
        { prompt: input },
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_HF_API_KEY}`,  // ✅ Envoyer la clé API
            "Content-Type": "application/json"
          }
        }
      );

      const botReply = response.data.response || "❌ Aucune réponse reçue.";
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("❌ Erreur lors de la connexion à FastAPI:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "❌ Une erreur s'est produite, veuillez réessayer plus tard.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chatbot-container ${isMinimized ? "minimized" : "expanded"}`}>
      {isMinimized ? (
        <div className="chatbot-icon" onClick={toggleMinimize}>
          💬
        </div>
      ) : (
        <>
          <div className="chatbot-header">
            <button className="minimize-button" onClick={toggleMinimize}>
              📥
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="chatbot-message bot">⌛ En cours de réponse...</div>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="💬 Tapez votre question ici..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "⌛ En attente..." : "📤 Envoyer"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotComponent;