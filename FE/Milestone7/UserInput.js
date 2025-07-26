import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function UserInput({ onSend }) {
  const { state, dispatch } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.input.trim()) {
      onSend(state.input);
      dispatch({ type: 'SET_INPUT', payload: '' });
    }
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={state.input}
        onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
        placeholder="Type your message..."
      />
      <button type="submit" disabled={state.loading}>Send</button>
    </form>
  );
}

export default UserInput;
