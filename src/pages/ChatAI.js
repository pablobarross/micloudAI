import React, { useState } from 'react';
import './ChatAI.css';

const ChatAI = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: '¡Hola! Soy tu asistente de IA. Puedo ayudarte a analizar y responder preguntas sobre tus documentos PDF. ¿Qué te gustaría saber?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Esta es una respuesta simulada de la IA. En una implementación real, aquí se procesaría tu pregunta con respecto a los documentos PDF que hayas subido.'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="chat-ai-page">
      <div className="container">
        <div className="chat-header">
          <h1>Chat con IA</h1>
          <p>Conversa con tus documentos PDF usando inteligencia artificial</p>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <span className="loading-dots">Pensando</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu pregunta sobre tus documentos..."
              disabled={isLoading}
            />
            <button type="submit" disabled={!inputMessage.trim() || isLoading}>
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAI; 