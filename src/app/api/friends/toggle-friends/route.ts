import { getServerSession } from "next-auth";
import prisma from "@/constants/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";

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
    const { searchParams } = new URL(req.url);
    const queryParam = {
      friendID: searchParams.get("friendID"),
    };

    if (!queryParam.friendID) {
      throw new Error("Invalid Query Parameter");
    }

    const friend = await prisma.user.findFirst({
      where: {
        id: queryParam.friendID,
      },
    });

    if (!friend) {
      return Response.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 401 }
      );
    }

    if (user.id === friend.id) {
      throw new Error("user cannot make a frind itself");
    }

    const userFrindsProfile = await prisma.friendsList.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!userFrindsProfile) {
      return Response.json(
        {
          success: false,
          message: "User Friends Profile Not Found",
        },
        { status: 401 }
      );
    }

    const check = userFrindsProfile?.friendsID;

    const IsAlreadyFrinnds = check?.includes(friend.id);

    if (IsAlreadyFrinnds) {
      // removes friend from user friends profile
      await prisma.friendsList.update({
        where: {
          userId: user.id,
        },
        data: {
          friends: {
            disconnect: {
              id: friend.id,
            },
          },
        },
      });

      return Response.json(
        {
          message: "friend Remove From Friend List",
          success: true,
        },
        { status: 200 }
      );
    }
    // makes friends
    // in this we use prisma upsert "upsert means if user friends profile are not created then create friends profile if user friends already cretaes then update profile "
    await prisma.friendsList.upsert({
      where: {
        userId: user.id,
      },
      update: {
        friends: {
          connect: {
            id: friend.id,
          },
        },
      },
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
        friends: {
          connect: {
            id: friend.id,
          },
        },
      },
    });

    return Response.json(
      {
        message: "Friends Created Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while toggle friends",
      },
      { status: 500 }
    );
  }
}
