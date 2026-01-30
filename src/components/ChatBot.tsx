import React, { useState } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "./ChatBot.css";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { sender: "user", text: message }
    ];
    setChatHistory(updatedHistory);

    try {
      const res = await fetch("https://2842b2b7020b.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const botReply = data.reply || "AI did not respond.";

      setChatHistory([
        ...updatedHistory,
        { sender: "bot", text: botReply }
      ]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { sender: "bot", text: "⚠ Could not connect to AI chatbot." }
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      <Button
        variant="outline"
        size="icon"
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </Button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot className="bot-icon" />
              <span>AskOral Chatbot</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          </div>

          <div className="chatbot-messages">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">
                  {msg.sender === "bot" ? (
                    <ul className="bot-bullets">
                      {msg.text
                        .split("\n")
                        .filter(line => line.trim().startsWith("•"))
                        .map((line, i) => (
                          <li key={i}>
                            {line.replace("•", "").trim()}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="input-field"
              rows={2}
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="send-button"
            >
              {loading ? "Thinking..." : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
