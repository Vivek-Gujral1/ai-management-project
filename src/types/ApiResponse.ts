

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
  email: string | null;
  id: string;
  avatar: string | null;
  headline: string | null;
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

export interface searchedusers extends user {
  isFriend : boolean
}

export interface ITask {
  Company : Companies 
  title : string
  sender : user
  content : string
  createdAt : Date
  id : string
}


export interface ApiResponse {
  success: boolean;
  message: string;
  companies?: Array<Companies>;
  users?: Array<user>;
  user?: user;
  messages?: Array<IMessage>
  company?: ICompany
  searchUsers? : Array<searchedusers>
  tasks? : Array<ITask>
}
