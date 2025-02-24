import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import Sidebar from '../components/Sidebar';
const Chat = () => {
  return (
    <div className="flex h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <ChatHeader channelName="general" memberCount={24} />
      <MessageList />
      <MessageInput />
    </div>
  </div>
  )
}

export default Chat