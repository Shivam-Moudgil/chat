import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { MessageListProps } from '../interfaces/chat';
import { convertUTCToLocalTime } from '../utils/DateTimeHelper';
import { useAuth } from '../context/UserContext';

// interface Message {
//   id: string;
//   user: {
//     name: string;
//     avatar: string;
//   };
//   content: string;
//   timestamp: string;
//   reactions: Array<{
//     emoji: string;
//     count: number;
//   }>;
//   isPinned?: boolean;
//   attachments?: Array<{
//     type: 'image' | 'file';
//     url: string;
//     name: string;
//   }>;
//   replies?: number;
// }
// import { Edit, MessageSquare, MoreHorizontal, Pin, Smile, Trash } from 'lucide-react';

const MessageList:React.FC<MessageListProps> = ({messages}) => {
  console.log(messages,"Messages in the message list")
  const {user}= useAuth()
  // const messages: Message[] = [
  //   {
  //     id: '1',
  //     user: {
  //       name: 'John Doe',
  //       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces',
  //     },
  //     content: "Hey everyone! Check out this new design I'm working on.",
  //     timestamp: '11:30 AM',
  //     reactions: [
  //       { emoji: '👍', count: 3 },
  //       { emoji: '❤️', count: 2 },
  //     ],
  //     isPinned: true,
  //     attachments: [
  //       {
  //         type: 'image',
  //         url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
  //         name: 'design-preview.png',
  //       },
  //     ],
  //     replies: 3,
  //   },
  // ];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map(message => (
        <div key={message._id} className="group relative">
          {/* {message.isPinned && (
            <div className="absolute -left-6 top-2">
              <Pin className="w-4 h-4 text-gray-400" />
            </div>
          )} */}
          <div className="flex items-start">
            <img
              src={message.sender.avatar.url}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-semibold mr-2">{message.sender.name}</span>
                <span className="text-sm text-gray-500">{convertUTCToLocalTime(message.createdAt,"Do MMM YYYY, hh:mm A")}</span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <p className="mt-1">{message.content}</p>
              
              {/* {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      {attachment.type === 'image' ? (
                        <img src={attachment.url} alt={attachment.name} className="max-w-md rounded" />
                      ) : (
                        <div className="bg-gray-100 p-3 rounded flex items-center">
                          <span className="text-sm text-gray-700">{attachment.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )} */}

              <div className="mt-2 flex items-center space-x-4">
                {/* <div className="flex -space-x-1">
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded-full text-sm hover:bg-gray-200"
                    >
                      {reaction.emoji} {reaction.count}
                    </button>
                  ))}
                  <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                    <Smile className="w-4 h-4 text-gray-500" />
                  </button>
                </div> */}

                {/* <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {message.replies} replies
                </button> */}

            {user?._id === message.sender._id &&    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash className="w-4 h-4 text-gray-500" />
                  </button>
                </div>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;