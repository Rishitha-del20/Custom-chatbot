import React, { useState } from 'react';

function Ui({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return React.createElement(
    'form',
    { className: 'user-input', onSubmit: handleSubmit },
    React.createElement('input', {
      type: 'text',
      value: input,
      onChange: (e) => setInput(e.target.value),
      placeholder: 'Type your message...'
    }),
    React.createElement('button', { type: 'submit' }, 'Send')
  );
}

export default Ui;
