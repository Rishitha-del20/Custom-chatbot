import React from 'react';
import ChatWindow from './components/cw';

function App() {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement('h1', null, 'AI Chat Interface'),
    React.createElement(ChatWindow)
  );
}

export default App;
