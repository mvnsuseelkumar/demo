import { useState, useEffect, useRef } from "react";
import { chatAPI } from "../services/api";
import "./ChatBox.css";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(input);
      const botMsg = { text: response.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = {
        text: "Sorry, I had trouble responding. Try again?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Career Assistant</h3>
      </div>

      <div className="messages-list">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <p>Thinking...</p>
          </div>
        )}
        <div ref={messagesEnd} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about careers..."
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
