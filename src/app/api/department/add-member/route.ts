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
      userId : searchParams.get("userId"),
      companyId : searchParams.get("companyId")
     };

     if (!queryParam.departmentId || !queryParam.userId || !queryParam.companyId) {
        throw new Error("Invalid Query Parameter")
     }

     const company = await prisma.company.findFirst({
      where : {
        id : queryParam.companyId
      } ,
      include : {
        departments : true ,
        Members : true
      }
     })

     if (!company) {
      return Response.json(
        {
          success: false,
          message: "Company not found",
        },
        { status: 401 }
      );
     }

     // checking is department exists in company departments
    
      
     const department = company.departments.find((department)=> department.id === queryParam.departmentId)

     if (!department) {
      return Response.json(
        {
          success: false,
          message: "Department are not lying under company departments",
        },
        { status: 400 }
      );
     }
  
     const user = company.Members.find((member)=> member.id === queryParam.userId) 

     if (!user) {
        return Response.json({
            success : false,
            message : "Firstly user should add in Company then department"
        } , {status : 401})
     }

     const updateDepartment = await prisma.department.update({
      where : {
        id : department.id
      } ,
      data : {
        Members : {
          connect : {
            id : user.id
          }
        }
      }
     })


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