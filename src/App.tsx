import React from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatHeader channelName="general" memberCount={24} />
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;