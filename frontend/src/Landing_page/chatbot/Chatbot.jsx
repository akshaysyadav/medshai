import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="chatbot-toggle p-3" onClick={toggleChatbot}>
        <div className="chatbot-icon">
          <i className="fas fa-robot"></i>
        </div>
        <div className="chatbot-pulse"></div>
        <div className="chatbot-tooltip">
          <span>Ask our Medical Robot Assistant</span>
        </div>
      </div>

      {/* Chatbot Sidebar */}
      <div className={`chatbot-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <i className="fas fa-robot"></i>
            <span>Health Assistant</span>
          </div>
          <button className="chatbot-close" onClick={toggleChatbot}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chatbot-content">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/QeQBju8rakjsAOw3oar75"
            width="100%"
            style={{ height: '100%', minHeight: '500px', border: 'none' }}
            frameBorder="0"
            title="Health Assistant Chatbot"
          />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="chatbot-overlay" onClick={toggleChatbot}></div>}
    </>
  );
};

export default Chatbot;
