import API_BASE_URL from "../config";
import React, { useState, useEffect, useRef } from "react";

const ChatComponent = ({ userId, recipientId, chatId, recipientName, senderType, closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("❌ Les données récupérées ne sont pas un tableau :", data);
          setMessages([]);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des conversations :", error);
        setMessages([]);
      }
    };

    fetchMessages();

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${userId}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        console.log("📩 Nouveau message reçu via WebSocket :", newMessage);
        updateMessages(newMessage);
      } catch (error) {
        console.error("❌ Erreur lors de la réception du message :", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [chatId]);

  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      console.log("🔄 Messages mis à jour :", updatedMessages);
      return updatedMessages;
    });
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (socket && message.trim()) {
      if (!recipientId) {
        console.error("❌ Erreur : recipientId manquant !");
        alert("❌ Impossible d'envoyer un message sans sélectionner un patient !");
        return;
      }

      const newMessage = {
        chat_id: chatId,
        doctor_id: userId,
        patient_id: recipientId,
        message: message,
        message_type: "text",
        sender: senderType,
        timestamp: new Date().toISOString()
      };

      console.log("📨 Envoi du message :", newMessage);

      try {
        socket.send(JSON.stringify(newMessage));
        console.log("✅ Message envoyé via WebSocket");
        updateMessages(newMessage);
        setMessage("");

        const response = await fetch(`${API_BASE_URL}/api/chat/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage)
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("❌ Échec de l'enregistrement du message :", data);
        } else {
          console.log("✅ Message enregistré avec succès dans la base de données :", data);
        }
      } catch (error) {
        console.error("❌ Erreur lors de l'envoi du message :", error);
      }
    }
  };

  return (
    <div className="chat-container">
      {isChatOpen ? (
        <>
          <div className="chat-header">
            <h3>{recipientName}</h3>
            <button
              className="close-chat"
              onClick={() => {
                setIsChatOpen(false);
                closeChat(); // Appeler closeChat pour réafficher le chat-panel
              }}
            >
              ✖
            </button>
          </div>
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "doctor" ? "sent" : "received"}`}>
                <p>{msg.message}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message..."
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </>
      ) : (
        <div className="last-message" onClick={() => setIsChatOpen(true)}>
          <p><strong>{recipientName}:</strong> {messages.length > 0 ? messages[messages.length - 1].message : "Aucun message pour le moment"}</p>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
