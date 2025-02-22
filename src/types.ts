// src/types.ts

export interface User {
  id: string;
  name: string;
  avatar?: string; // URL to avatar image
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
}

export interface Message {
  id: string;
  userId: string;
  channelId: string;
  text: string;
  timestamp: number; // Unix timestamp
}
