import { Company } from "@prisma/client"
export interface ApiResponse {
    success : boolean
    message : string
    companies? : Array<Company>
}