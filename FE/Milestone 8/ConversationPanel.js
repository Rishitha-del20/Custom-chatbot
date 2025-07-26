import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function ConversationPanel() {
  const { state, dispatch } = useContext(ChatContext);

  const handleSave = () => {
    const timestamp = new Date().toLocaleString();
    dispatch({
      type: 'SAVE_CONVERSATION',
      payload: {
        id: Date.now(),
        timestamp,
        messages: state.messages,
      },
    });
  };

  const handleLoad = (messages) => {
    dispatch({ type: 'SET_MESSAGES', payload: messages });
  };

  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
      <button onClick={handleSave}>Save Conversation</button>
      <h4>Past Sessions</h4>
      {state.conversations.map((conv) => (
        <div key={conv.id}>
          <button onClick={() => handleLoad(conv.messages)}>
            {conv.timestamp}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ConversationPanel;
