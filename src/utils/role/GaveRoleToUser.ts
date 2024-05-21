import prisma from "@/constants/prisma"
import { ApiResponse } from "@/types/ApiResponse"

import { userRole } from "@prisma/client"

interface functionParameters{
    userId : string
    Role   : userRole
    companyId? : string 
}

export async function GaveRoleToUser({userId , companyId , Role} : functionParameters) : Promise<ApiResponse>{
    try {
        const user = await prisma.user.findFirst({
            where : {
                id : userId
            }
        })
        if (!user) {
            return {
                message : "User not found" ,
                success : false
            }
        }

        const company = await prisma.company.findFirst({
            where : {
                id : companyId
            }
        }) 
        if (!company) {
            return {
                message : "Company not found" ,
                success : false
            }
        }

        // gave role
        await prisma.role.create({
            data : {
                Role   ,
                company : {
                    connect : {
                        id : company.id
                    }
                },
                user  : {
                    connect : {
                        id : user.id
                    }
                } ,

            }
        })

        return {
            success : true ,
            message : "Successfully gaves a role to user"
        }

    } catch (error) {
        console.error("error while sending email" , error)
        return {
            success : false ,
            message : "Failed to gave role"
        }
    }
}