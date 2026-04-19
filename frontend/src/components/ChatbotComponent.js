import React, { useState, useRef, useEffect } from "react";
import API_BASE_URL from "../config";
import axios from "axios";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import "./Chatbot.scss";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    {
      text: "Bonjour. Je suis l’assistant BrainScan. Posez vos questions sur la plateforme ou des informations générales (sans diagnostic médical).",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading, open]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/chatbot/chat/`,
        { prompt: text },
        { headers: { "Content-Type": "application/json" }, timeout: 120000 }
      );
      const botReply = response.data.response || "Réponse indisponible.";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Impossible de joindre le service. Réessayez dans un instant.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir l’assistant"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </button>
    );
  }

  return (
    <div className="chatbot-panel" role="dialog" aria-label="Assistant BrainScan">
      <header className="chatbot-panel__header">
        <div className="chatbot-panel__title">
          <span className="chatbot-panel__icon">
            <Sparkles size={18} />
          </span>
          <div>
            <strong>Assistant BrainScan</strong>
            <span className="chatbot-panel__subtitle">IA · Réponses informatives</span>
          </div>
        </div>
        <button
          type="button"
          className="chatbot-panel__close"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </header>

      <div className="chatbot-panel__messages" ref={listRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-bubble chatbot-bubble--${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-bubble chatbot-bubble--bot chatbot-bubble--typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <div className="chatbot-panel__input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez votre message…"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Envoyer"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
