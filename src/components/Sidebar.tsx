// src/components/Sidebar.tsx
import React from 'react';
import type { Channel, User } from '../types';

interface SidebarProps {
  channels: Channel[];
  currentUser: User;
  onChannelSelect: (channelId: string) => void;
  selectedChannelId: string | null;
}
const Sidebar: React.FC<SidebarProps> = ({ channels, currentUser, onChannelSelect, selectedChannelId }) => {

    return (
        <div className="bg-gray-900 text-gray-300 w-64 p-4 flex flex-col">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Workspace</h2>
                <div className="flex items-center mt-2">
                    {/* Placeholder for user avatar */}
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                    <span>{currentUser.name}</span>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-md font-semibold">Channels</h3>
                <ul>
                    {channels.map((channel) => (
                        <li
                            key={channel.id}
                            className={`cursor-pointer hover:bg-gray-800 p-2 rounded ${selectedChannelId === channel.id ? 'bg-gray-700' : ''
                                }`}
                            onClick={() => onChannelSelect(channel.id)}
                        >
                            # {channel.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Sidebar;
