// src/components/MessageList.tsx

import React from 'react';
import type { Message, User } from '../types';

interface MessageListProps {
  messages: Message[];
  users: Record<string, User>; // Map of user IDs to User objects
}

const MessageList: React.FC<MessageListProps> = ({ messages, users }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message) => {
        const user = users[message.userId];
        const time = new Date(message.timestamp).toLocaleTimeString();
        return (
          <div key={message.id} className="mb-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-700 rounded-full mr-2">
                {/* Display user avatar if available */}
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full"
                  />
                )}
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-semibold mr-2">{user?.name}</span>
                  <span className="text-xs text-gray-400">{time}</span>
                </div>
                <p className="text-gray-200">{message.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
