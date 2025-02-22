// src/App.tsx

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ChannelHeader from './components/ChannelHeader';
import type { Channel, Message, User } from './types';

const App: React.FC = () => {
  // Dummy data for initial UI rendering
  const [users, setUsers] = useState<Record<string, User>>({
    user1: { id: 'user1', name: 'John Doe', avatar: '' },
    user2: { id: 'user2', name: 'Jane Smith', avatar: '' },
  });

  const [channels, setChannels] = useState<Channel[]>([
    { id: 'channel1', name: 'general' },
    { id: 'channel2', name: 'random' },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 'msg1', userId: 'user1', channelId: 'channel1', text: 'Hello everyone!', timestamp: Date.now() - 60000 },
    { id: 'msg2', userId: 'user2', channelId: 'channel1', text: 'Hi John!', timestamp: Date.now() - 30000 },
    { id: 'msg3', userId: 'user1', channelId: 'channel2', text: 'Anyone here?', timestamp: Date.now() - 10000 },
  ]);

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>('channel1');

  const handleSendMessage = (text: string) => {
    if (selectedChannelId) {
      const newMessage: Message = {
        id: `msg${Date.now()}`, // Generate unique ID
        userId: 'user1', //  Current user
        channelId: selectedChannelId,
        text,
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannelId(channelId);
  };

    const selectedChannel = channels.find(channel => channel.id === selectedChannelId) || null;
    const filteredMessages = selectedChannelId
        ? messages.filter((message) => message.channelId === selectedChannelId)
        : [];

  return (
    <div className="flex h-screen">
      <Sidebar
        channels={channels}
        currentUser={users['user1']}
        onChannelSelect={handleChannelSelect}
        selectedChannelId={selectedChannelId}
      />
      <div className="flex flex-col flex-1">
        <ChannelHeader channelName={selectedChannel?.name} />
        <MessageList messages={filteredMessages} users={users} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
