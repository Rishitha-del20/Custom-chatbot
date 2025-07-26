import React, { createContext, useReducer } from 'react';

const ChatContext = createContext();

const initialState = {
  messages: [],
  loading: false,
  input: '',
  conversations: [], // for Milestone 8
};

function chatReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SAVE_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
        messages: [],
        input: '',
      };
    default:
      return state;
  }
}

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
