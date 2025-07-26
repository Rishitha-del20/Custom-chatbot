import React from 'react';
import Message from './message';

function Messagelist({ messages }) {
  return React.createElement(
    'div',
    { className: 'message-list' },
    messages.map((msg) =>
      React.createElement(Message, {
        key: msg.id,
        sender: msg.sender,
        text: msg.text,
      })
    )
  );
}

export default Messagelist;
