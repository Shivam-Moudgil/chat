import { useEffect, useRef } from 'react';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { MessageListProps, MessageData } from '../interfaces/chat';
import { convertUTCToLocalTime } from '../utils/DateTimeHelper';
import { useAuth } from '../context/UserContext';

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageListRef} className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message: MessageData) => (
        <div key={message._id} className="group relative">
          <div className="flex items-start">
            <img
              src={message.sender.avatar.url}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold mr-2">{message.sender.name}</span>
                <span className="text-sm text-gray-500">
                  {convertUTCToLocalTime(message.createdAt, 'Do MMM YYYY, hh:mm A')}
                </span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <p className="mt-1">{message.content}</p>

              {user?._id === message.sender._id && (
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
