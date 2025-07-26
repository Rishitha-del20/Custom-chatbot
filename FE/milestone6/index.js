import React, { useState } from 'react';
import Messagelist from './messagelist';
import Ui from './ui';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! How can I help you today?' }
  ]);

  const handleSend = (text) => {
    const userMessage = { id: messages.length + 1, sender: 'user', text };
    const aiMessage = {
      id: messages.length + 2,
      sender: 'ai',
      text: 'AI response placeholder.'
    };

    setMessages([...messages, userMessage, aiMessage]);
  };

  return React.createElement(
    'div',
    { className: 'chat-window' },
    React.createElement(Messagelist, { messages }),
    React.createElement(Ui, { onSend: handleSend })
  );
}

export default ChatWindow;
