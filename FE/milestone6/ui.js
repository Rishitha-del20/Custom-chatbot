import React from 'react';

function Message({ sender, text }) {
  const isUser = sender === 'user';

  return React.createElement(
    'div',
    { className: `message ${isUser ? 'user' : 'ai'}` },
    React.createElement('strong', null, isUser ? 'You: ' : 'AI: '),
    text
  );
}

export default Message;
