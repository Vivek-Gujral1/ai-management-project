import prisma from "@/constants/prisma";

export async function GET(req : Request) {
    try {
        const { searchParams } = new URL(req.url);
        const queryParam = {
        GroupSocketRoomName: searchParams.get("GroupSocketRoomName")
       };
    
       if (!queryParam.GroupSocketRoomName) {
        throw new Error("Invalid Query Parameters")
       }

       const messages = await prisma.message.findMany({
        where : {
            GroupSocketRoomName : queryParam.GroupSocketRoomName
        }
       })

      
        return Response.json({
            success : true,
            message : "Message Fetched Successfully " ,
            messages
        }  , {status : 200})
       

       
    } catch (error) {
        return Response.json(
            {
              success: false,
              message: "Error while sending message",
            },
            { status: 500 }
          );
     
    }
}