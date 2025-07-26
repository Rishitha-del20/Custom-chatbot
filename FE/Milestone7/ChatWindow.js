import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationPanel from './ConversationPanel'; // for milestone 8

function ChatWindow() {
  const { state, dispatch } = useContext(ChatContext);

  const handleSend = (text) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'user', text } });
    dispatch({ type: 'SET_LOADING', payload: true });

    setTimeout(() => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { sender: 'ai', text: 'AI response placeholder.' },
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  return (
    <div className="chat-window">
      <div style={{ display: 'flex' }}>
        <ConversationPanel />
        <div style={{ flex: 1 }}>
          <MessageList messages={state.messages} />
          <UserInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
