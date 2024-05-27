
import prisma from "../../../../constants/prisma";


export  async function GET (req : Request){
  const {searchParams}= new URL(req.url)

  const queryParam = {
    query : searchParams.get("query")
  }
   
    if (!queryParam.query) {
        throw new Error("Invalid Query Parameter")
    }
    const searchedusers  = await prisma.user.findMany({
        where : {
           OR : [
            {
                email : {
                    contains : queryParam.query
                }
            } ,
            {
                name : {
                    contains : queryParam.query
                }
            }
           ]
        } ,
        select : {
            createdAt: true,
            name: true,
            email: true,
            id: true,
            avatar: true,
            headline: true,
        }
    })

    if (!searchedusers) {
        return Response.json({
            success : false ,
            message  : "cant find any users with this query"
        })
    }

    return Response.json({
        success : true ,
        message : "Users fetched with this query"
    })
   

    }