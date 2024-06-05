"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '@/queryFunctions/message/message'
import {  useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { message, useSocket } from '@/app/custom-Hooks/SocketProvider'
import { useSession } from 'next-auth/react'
import Message from '@/components/my-components/Message'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IoSend } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Textarea } from '@/components/ui/textarea'

interface FormType {
  content : string
}

interface params {
  id : string
}

function page({params} : {params : params}) {
  const {register , handleSubmit , reset} = useForm<FormType>()
  const friend = useSelector((state : RootState)=> state.friend.friend)
  const router = useRouter()
  const {sendMessage , Messages} = useSocket()
  const { data } = useSession();

 
  if (!data) {
    return <div>please Login</div>;
  }
  const user = data.user;
  if (!friend) {
    router.push("/message/friends")
    return
  }
  const {data : backendMessages, isLoading} = useQuery({
    queryKey : ["message/friend"],
    queryFn : async() => await getMessages(params.id)
  })


  if (isLoading) {
    return <Skeleton />
  }


  const sendmessages = async (data : FormType) => {
    console.log("message send function");

    const message: message = {
      content: data.content,
      sender: {
        avatar: user.avatar ? user.avatar :"",
        id: user.id,
        name: user.name,  
      },
      roomName : params.id
     
    };

    await sendMessage(params.id, message);
    reset();

    
  };

  const allMessages = [...(backendMessages ?? []), ...Messages];
  console.log(allMessages);

  return (
    <main className=' h-full w-full mt-5 flex flex-col gap-8'>
   <div className=" h-14 w-full  flex flex-row justify-center items-center gap-3">
    <Avatar>
      <AvatarImage src={friend.avatar ? friend.avatar : ""}></AvatarImage>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <h1 className=" text-3xl font-semibold ">
              {friend.name}
        </h1>
      </div>

      <div className=" h-5/6 overflow-auto flex flex-col-reverse ">
        <div className=" mr-5 ml-5 ">
          {allMessages?.map((message) => (
            <Message
              key={message.content}
              message={message}
              isOwner={message.sender.id === user.id}
            />
          ))}
        </div>
      </div>
      <div className="  h-1/6 flex flex-row gap-5 ">
        <form
          className=" h-full w-full flex flex-row gap-5 items-center"
          onSubmit={handleSubmit(sendmessages)}
        >
          <Textarea
            className=" h-3/4 resize-none pl-2 "
            placeholder="Sends a Message"
            {...register("content")}
          />
          <Button className=' '>
            <IoSend className=" text-3xl" />
          </Button>
        </form>
      </div>
    </main>
  )
}

export default page