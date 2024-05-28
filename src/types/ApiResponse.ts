import { Company, User } from "@prisma/client";

export interface Companies {
  sokcetRoomName: string;
  createdAt: Date;
  name: string;
  email: string | null;
  id: string;
  avatar: string | null
  headline: string | null
}

export interface user {
  createdAt: Date;
  name: string;
  email?: string;
  id: string;
  avatar?: string;
  headline?: string;
}

export interface IMessage {
  content: string,
  sender: user
}

export interface ICompany {
  sokcetRoomName: string,
  createdAt: Date,
  name: string,
  email: string | null,
  id: string,
  avatar: string | null,
  headline: string | null
}

export interface Idepartments {
  sokcetRoomName: string,
  createdAt: Date,
  name: string,
  comapny: Companies,
  id: true,
  headline: true
}


export interface ApiResponse {
  success: boolean;
  message: string;
  companies?: Array<Companies>;
  users?: Array<user>;
  user?: user;
  messages?: Array<IMessage>
  company: ICompany
  departments?: Array<Idepartments>
  
}
