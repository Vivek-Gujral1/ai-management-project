import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/constants/prisma";
import { SendCompanyVerificationEmail } from "@/utils/SendCompanyVerificationEmail";
import { GaveRoleToUser } from "@/utils/role/GaveRoleToUser";

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Not Authenticated",
  //     },
  //     { status: 401 }
  //   );
  // }

  // const user = session.user;
  try {
    
    const { name, headline }: { name: string; headline?: string } = await req.json();
    const { searchParams } = new URL(req.url);
    const queryParam = {
    companyId: searchParams.get("companyId"),
   };

    if (!queryParam.companyId) {
        throw new Error("Invalid Query Parameter")
    }

   const comapny  = await prisma.company.findFirst({
    where : {
        id : queryParam.companyId
    }
   })

   if (!comapny) {
    return Response.json({
        success : false,
        message : "Comapny not found"
    } , {status : 401})
   }


    const sokcetRoomName = `${comapny.id}_${name}`;

    // creates socket room named  to ensure that with socket.io, only one room is created with the same name and no duplicate rooms are  created.
    const exisitingDepartment = await prisma.department.findFirst({
      where: {
        sokcetRoomName,
      },
    });
    if (exisitingDepartment) {
      return Response.json(
        {
          success: false,
          message: "Company has already creates a department with this name",
        },
        { status: 400 }
      );
    }

  
   const idLength = comapny?.id.length
   console.log(`id length ${idLength}`);
   
   

    const newDepartment = await prisma.department.create({
        data : {
            name ,
            sokcetRoomName ,
            headline : headline || "" ,
            comapny : {
                connect : {
                    id : comapny?.id
                }
            } ,
            Members : {
              connect : {
                id : "664df0aa788b92a19149af7d"
              }
            }

        }
    })

    const gaveRole = await GaveRoleToUser({Role :"Manager" , userId : "664df0aa788b92a19149af7d", depatmentId : newDepartment.id})

    if (!gaveRole.success) {
        return Response.json({
            success : false,
            message : gaveRole.message
        } , {status : 500})
    }
    return Response.json({
        success : true,
        message : "Department Cretated Successfully"
    } , {status : 200})

  } catch (error) {
    console.error("Company Creation error", error);

    return Response.json(
      {
        success: false,
        message: "Error while creating Comapany",
      },
      { status: 500 }
    );
  }
}
