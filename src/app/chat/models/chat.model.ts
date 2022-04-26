export interface Conversation {
  chatId: number;
  firstName: string;
  image: string;
  lastMessage: string;
  lastName: string;
  unreadMessagesCount: number;
  userId: number;
  username: string;
}

export interface DayChat {
  date: string;
  messages: Messages[];
}

export interface Messages {
  chatId?: number;
  firstName?: string;
  lastName?: string;
  message?: string;
  userId?: number;
  messageDate?: string;
  senderId?: number;
  receiverId?: number;
}
