import React from 'react';
import { Hash, Users, Star, Bell, Search, Phone, Video } from 'lucide-react';

interface ChatHeaderProps {
  channelName: string;
  memberCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ channelName, memberCount }) => {
  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Hash className="w-6 h-6 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold">{channelName}</h2>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <Star className="w-5 h-5" />
        </button>
        <div className="h-6 mx-4 border-l border-gray-300" />
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <Users className="w-5 h-5 mr-1" />
          <span>{memberCount}</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-8 pr-4 py-1 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <Phone className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <Video className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;