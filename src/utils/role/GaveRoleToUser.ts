import prisma from "@/constants/prisma";
import { ApiResponse } from "@/types/ApiResponse";

import { userRole } from "@prisma/client";

interface functionParameters {
  userId: string;
  Role: userRole;
  companyId?: string;
  depatmentId?: string;
}

export async function GaveRoleToUser({
  userId,
  companyId,
  Role,
  depatmentId,
}: functionParameters): Promise<ApiResponse> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }

    if (companyId) {
      // gave role
      await prisma.role.create({
        data: {
          Role,
          company: {
            connect: {
              id: companyId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return {
        success: true,
        message: "Successfully gaves a role to user",
      };
    }
    if (depatmentId) {
      await prisma.role.create({
        data: {
          Role,
          department: {
            connect: {
              id: depatmentId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return {
        success: true,
        message: "Successfully gaves a role to user",
      };
    }
    return {
        success : false ,
        message : "Invalid Parameters "
    }
  } catch (error) {
    console.error("error while sending email", error);
    return {
      success: false,
      message: "Failed to gave role",
    };
  }
}
