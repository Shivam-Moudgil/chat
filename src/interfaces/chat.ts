export interface SidebarProps{
    availableUsers:AvailableUsers[];
    setChat:React.Dispatch<React.SetStateAction<string>>;
}

export interface AvailableUsers{
    _id:string;
    name:string;
    email: string;
    avatar:Image;
}

interface Image{
    url:string;
    localPath:string;
}

export interface MessageListProps{
messages:MessageData[] ;
}

export interface MessageData{
    _id:string;
    sender:AvailableUsers;
    content:string;
    chat:string;
    attachments:Image[];
    createdAt:string;
    updatedAt:string;
}

export interface Chat {
  _id: string;
  name: string;
  isGroupChat: boolean;
  participants: AvailableUsers[];
  admin?: string; // Optional because group chats have an admin
  createdAt: string;
  updatedAt: string;
  lastMessage?: MessageData; // Optional last message
}
