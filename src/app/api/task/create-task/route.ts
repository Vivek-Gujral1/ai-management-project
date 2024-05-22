import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/constants/prisma";

interface TaskDetails {
  content: string;
  title: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const SessionUser = session.user;

  try {
    const { content, title }: TaskDetails = await req.json();
    if ([content, title].some((item) => item.trim() === "")) {
      throw new Error("please provide full information");
    }
    const { searchParams } = new URL(req.url);
    const queryParam = {
      departmentId: searchParams.get("departmentId"),
      recieverId: searchParams.get("recieverId"),
    };
    if (!queryParam.departmentId || !queryParam.recieverId) {
      throw new Error("Invalid Query Parameter");
    }

    const reciver = await prisma.user.findFirst({
      where: {
        id: queryParam.recieverId,
      },
    });

    if (!reciver) {
        return Response.json(
            {
              success: false,
              message: " Reciever not found",
            },
            { status: 401 }
          );
    }

    const department = await prisma.department.findFirst({
        where : {
            id : queryParam.departmentId
        }
    })

    if (!department) {
        return Response.json(
            {
              success: false,
              message: " Department not found",
            },
            { status: 401 }
          );
    }

    const newTask = await prisma.task.create({
        data : {
            title : title ,
            content : content ,
            sender : {
                connect : {id  : SessionUser.id}
            },
            reciver : {
                connect  : {
                    id : reciver.id
                }
            } ,
           department : {
            connect : {
                id : department.id
            }
           }
        } 
    
       
    })

    return Response.json(
        {
          success: true,
          message: "Task Created Successfully",
        },
        { status: 200 }
      );
    
  } catch (error) {
    return Response.json(
        {
          success: false,
          message: "Error while creating Task",
        },
        { status: 500 }
      );
  }
}
