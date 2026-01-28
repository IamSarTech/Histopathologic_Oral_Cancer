import React, { useState } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "./ChatBot.css";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const newChatHistory: Array<{ sender: "user" | "bot"; text: string }> = [
      ...chatHistory,
      { sender: "user" as const, text: message }
    ];
    setChatHistory(newChatHistory);

    try {
      const res = await fetch("https://14a2-103-4-221-252.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      const botResponse = data.reply || "🤖 AI did not respond.";
      setChatHistory([...newChatHistory, { sender: "bot" as const, text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...newChatHistory,
        { sender: "bot" as const, text: "⚠ Could not connect to AI chatbot." },
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
                className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                <div className="message-content">
                  {msg.text}
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
              {loading ? (
                "Thinking..."
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
