import { Company, User } from "@prisma/client";

 export interface Companies {
  sokcetRoomName: string;
  createdAt: Date;
  name: string;
  email: string | null;
  id: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  companies?: Array<Companies>;
  users?: Array<User>;
  userProfile?: User;
}
