import { Company, User } from "@prisma/client"
export interface ApiResponse {
    success : boolean
    message : string
    companies? : Array<Company>
    users?     : Array<User>
    userProfile? : User
}