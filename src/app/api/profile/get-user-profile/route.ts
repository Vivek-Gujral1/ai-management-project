import prisma from "@/constants/prisma"


export async function GET(req : Request) {
    try {
       const {searchParams} = new URL(req.url)
       const queryParam = {
        userId : searchParams.get("userId"), 
       }

       if (!queryParam.userId) {
        throw new Error("Invalid Query Parameter  , Cannot get user by queryParamets")
       }

       const profile = await prisma.profile.findFirst({
        where : {
            userId : queryParam.userId
        }
       })

       if (!profile) {
        return Response.json(
          {
            success: false,
            message: " Profile not found",
          },
          { status: 401 }
        );
       }

       return Response.json(
        {
          success: true,
          message: "User added Successfully to department",
          userProfile : profile
        },
        { status: 200 }
      ); 

    } catch (error) {
        console.error( "get user Profile error",error);
        
        return Response.json(
            {
              success: false,
              message: "error while getting a User Profile",
            },
            { status: 500 }
          ); 
    }
    
}