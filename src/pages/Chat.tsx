import { useCallback, useEffect, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import Sidebar from '../components/Sidebar';
import axios, { AxiosError } from 'axios';
import { MessageData } from '../interfaces/chat';
import { useSocket } from '../context/SocketContext';
const Chat = () => {
  const {socket} = useSocket();
  console.log(socket,"Socket from the chat component");
  const [loading,setIsLoading] = useState(true);
  const [availableUsers,setIsAvailableUsers] = useState([]);
  const [chat,setChat] = useState('');
const [messages,setMessages] = useState<MessageData[]>([]);
const fetchAvailableUsers=async()=>{
try{
  setIsLoading(true)
const response = await axios.get('/api/v1/chats/available-users');
setIsAvailableUsers(response.data.data);
setIsLoading(false)
}catch(err){
  setIsLoading(false)
  if(err instanceof AxiosError){
    console.log(err.response?.data,"AXIOS ERROR FETCHING THE USERS")
  }else{
    console.log(err,"ERROR FETCHING THE USERS")
  }
}
}

useEffect(() => {
  fetchAvailableUsers();
}, []);

const fetchChats = useCallback(async () => {
  try {
    setIsLoading(true);
    const response = await axios.get('/api/v1/chats/' + chat);
    console.log(response.data.data, "Response from the fetch chats");
    setMessages(response.data.data);
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    if (err instanceof AxiosError) {
      console.log(err.response?.data, "AXIOS ERROR FETCHING THE Messages");
    } else {
      console.log(err, "ERROR FETCHING THE chat messages");
    }
  }
}, [chat]);

useEffect(() => {
  if(chat){
    socket?.emit('joinChat', chat);
    fetchChats();
  }
}, [chat, fetchChats, socket]);


useEffect(()=>{
  if(socket){
    socket.on('recieved',(data:MessageData)=>{
     console.log(data,'Recieved Message');
     setMessages([...messages,data]);})
  }
},[messages, socket])

const handleMessage = async (content: string) => {
try{
  // setIsLoading(true);
  const response = await axios.post('/api/v1/chats/' + chat,{content});
  console.log(response.data.data, "Response from the send message");
  setMessages([...messages,response.data.data]);
  // setIsLoading(false);
}catch(err){
  // setIsLoading(false);
    if (err instanceof AxiosError) {
      console.log(err.response?.data, "AXIOS ERROR FETCHING THE send Messages");
    } else {
      console.log(err, "ERROR FETCHING THE chat messages");
    } 
}

}


if(loading){
  return <div>Loading...</div>
}

  return (
    <div className="flex h-screen bg-white">
    <Sidebar availableUsers={availableUsers} setChat={setChat} />
    <div className="flex-1 flex flex-col">
      <ChatHeader channelName="general" memberCount={24} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleMessage} />
    </div>
  </div>
  )
}

export default Chat
