import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/constants/prisma";
import { SendCompanyVerificationEmail } from "@/utils/SendCompanyVerificationEmail";
import { GaveRoleToUser } from "@/utils/role/GaveRoleToUser";

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

  const user = session.user;
  try {
   
    const { name, email }: { name: string; email?: string } = await req.json();

    const sokcetRoomName = `${user.id}_${name}`;
    // creates socket room named  to ensure that with socket.io, only one room is created with the same name and no duplicate rooms are  created.
    const exisitingCompany = await prisma.company.findFirst({
      where: {
        sokcetRoomName,
      },
    });
    if (exisitingCompany) {
      return Response.json(
        {
          success: false,
          message: "User has already creates a company with this name",
        },
        { status: 400 }
      );
    }
    if (email) {
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newCompany = await prisma.company.create({
        data: {
          name,
          sokcetRoomName,
          email,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          createdUser: {
            connect: {
              id: user.id,
            },
          },
          Members : {
            connect :{
              id : user.id
            }
          }
        },
      });

      const RoleResponse = await GaveRoleToUser({
        userId : user.id,
        Role: "Founder",
        companyId: newCompany.id,
      });

      if (!RoleResponse.success) {
        return Response.json(
          {
            success: false,
            message: RoleResponse.message,
          },
          { status: 500 }
        );
      }

      // send verification email
      const emailResponse = await SendCompanyVerificationEmail(
        email,
        newCompany.name,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
    

      return Response.json(
        {
          success: true,
          message: "Company created Successfully",
        },
        { status: 200 }
      );
    } else {
      const newCompany = await prisma.company.create({
        data: {
          name,
          sokcetRoomName,
          createdUser: {
            connect: {
              id: user.id,
            },
          }, 
          Members :{
            connect : {
              id : user.id
            }
          }
        },
      });

      const RoleResponse = await GaveRoleToUser({
        userId : user.id,
        Role: "Founder",
        companyId: newCompany.id,
      });

      if (!RoleResponse.success) {
        return Response.json(
          {
            success: false,
            message: RoleResponse.message,
          },
          { status: 500 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "Company created Successfully",
        },
        { status: 200 }
      );
    }
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
