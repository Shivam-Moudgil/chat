import React, { useState } from 'react';
import { Hash, Plus, Search, Settings, Users, MessageSquare, ChevronDown } from 'lucide-react';
import ChannelModal from './ChannelModal';

interface Channel {
  id: string;
  name: string;
  unread: number;
  isAdmin?: boolean;
}

interface DirectMessage {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  unread: number;
}

const Sidebar = () => {
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: 'general', unread: 2, isAdmin: true },
    { id: '2', name: 'random', unread: 0 },
    { id: '3', name: 'announcements', unread: 5, isAdmin: true },
  ]);

  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
      status: 'online',
      unread: 1,
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces',
      status: 'away',
      unread: 0,
    },
  ]);

  const handleCreateChannel = (name: string, members: string[]) => {
    console.log(members)
    const newChannel: Channel = {
      id: String(channels.length + 1),
      name,
      unread: 0,
      isAdmin: true,
    };
    setChannels(prev => [...prev, newChannel]);
  };

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between text-white">
          <h1 className="text-xl font-bold">Workspace</h1>
          <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center bg-gray-700 rounded p-2">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search channels"
              className="bg-transparent text-white w-full focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Channels</span>
            </div>
            <Plus
              className="w-4 h-4 cursor-pointer hover:text-white"
              onClick={() => setIsChannelModalOpen(true)}
            />
          </div>
          {channels.map(channel => (
            <div
              key={channel.id}
              className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 cursor-pointer group"
            >
              <Hash className="w-4 h-4 mr-2" />
              <span className="flex-1">{channel.name}</span>
              {channel.unread > 0 && (
                <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {channel.unread}
                </span>
              )}
              {channel.isAdmin && (
                <span className="text-xs text-gray-500 ml-2">Admin</span>
              )}
            </div>
          ))}
        </div>

        <div className="px-4">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Direct Messages</span>
            </div>
            <MessageSquare className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
          {directMessages.map(dm => (
            <div
              key={dm.id}
              className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 cursor-pointer group"
            >
              <div className="relative mr-2">
                <img
                  src={dm.avatar}
                  alt={dm.name}
                  className="w-6 h-6 rounded-full"
                />
                <div
                  className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-gray-900 ${
                    dm.status === 'online'
                      ? 'bg-green-500'
                      : dm.status === 'away'
                      ? 'bg-yellow-500'
                      : dm.status === 'busy'
                      ? 'bg-red-500'
                      : 'bg-gray-500'
                  }`}
                />
              </div>
              <span className="flex-1">{dm.name}</span>
              {dm.unread > 0 && (
                <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {dm.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces"
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Your Name</div>
            <div className="text-gray-400 text-xs">Available</div>
          </div>
        </div>
      </div>

      <ChannelModal
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
        onCreateChannel={handleCreateChannel}
      />
    </div>
  );
};

export default Sidebar;