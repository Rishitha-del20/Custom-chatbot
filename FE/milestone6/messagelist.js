import React, { useState } from 'react';
import messagelist from './messagelist';
import userinput from './userinput';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! How can I help you today?' }
  ]);

  const handleSend = (text) => {
    const userMsg = { id: messages.length + 1, sender: 'user', text };
    const aiMsg = {
      id: messages.length + 2,
      sender: 'ai',
      text: 'AI response placeholder.'
    };

    setMessages([...messages, userMsg, aiMsg]);
  };

  return React.createElement(
    'div',
    { className: 'chat-window' },
    React.createElement(messagelist, { messages }),
    React.createElement(userinput, { onSend: handleSend })
  );
}

export default ChatWindow;
