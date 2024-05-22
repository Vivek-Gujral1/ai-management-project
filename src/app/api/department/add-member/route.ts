import prisma from "@/constants/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { userRole } from "@prisma/client";
import { GaveRoleToUser } from "@/utils/role/GaveRoleToUser";

export async function POST(req : Request) {
    const session  = await getServerSession(authOptions)
    const user = session?.user
    console.log(session);
    
 
    if(!session || session.user) {
     return Response.json(
         {
           success: false,
           message: "Not Authenticated"
         },
         { status: 401 }
       );
    }

    try {

      const {Role} : {Role : userRole} = await req.json()
      const { searchParams } = new URL(req.url);
      const queryParam = {
      departmentId: searchParams.get("departmentId"),
      userID : searchParams.get("userId")
     };

     if (!queryParam.departmentId || !queryParam.userID) {
        throw new Error("Invalid Query Parameter")
     }

     const department  = await prisma.department.findFirst({
        where : {
            id :queryParam.departmentId
        }
     })

     if (!department) {
        return Response.json({
            success : false,
            message : "Department not found"
        } , {status : 401})
     }

     const user = await prisma.user.findFirst({
        where : {
            id : queryParam.userID
        }
     })

     if (!user) {
        return Response.json({
            success : false,
            message : "User not found"
        } , {status : 401})
     }

     const gaveRole = await GaveRoleToUser({userId : user.id , depatmentId : queryParam.departmentId , Role})

     if (!gaveRole.success) {
        return Response.json(
            {
              success: false,
              message: gaveRole.message,
            },
            { status: 500 }
          ); 
     }
     return Response.json(
      {
        success: true,
        message: "User added Successfully to department",
      },
      { status: 200 }
    ); 
      


    } catch (error) {
        console.error(error);
        
        return Response.json(
            {
              success: false,
              message: "error while adding a new member in department",
            },
            { status: 500 }
          ); 
    }
}