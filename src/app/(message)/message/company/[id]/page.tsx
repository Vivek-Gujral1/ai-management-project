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
import Chat from '@/components/my-components/Chat'
import { IoSend } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormType {
  content : string
}

function page() {
  const {register , handleSubmit , reset} = useForm<FormType>()
  const company = useSelector((state : RootState)=> state.company.company)
  const router = useRouter()
  const {sendMessage , Messages} = useSocket()
  const { data } = useSession();

 
  if (!data) {
    return <div>please Login</div>;
  }
  const user = data.user;
  if (!company) {
    router.push("/message/company")
    return
  }
  const {data : backendMessages, isLoading} = useQuery({
    queryKey : ["message/company"],
    queryFn : async() => await getMessages(company?.sokcetRoomName)
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
      roomName : company.sokcetRoomName
     
    };

    await sendMessage(company.sokcetRoomName, message);
    reset();

    
  };

  const allMessages = [...(backendMessages ?? []), ...Messages];
  console.log(allMessages);

  return (
    <main className=' h-full w-full'>
   <div className=" h-14 w-full border border-white flex flex-row justify-center items-center">
        <h1 className=" text-3xl text-white ">
              {company.name}
        </h1>
      </div>

      <div className=" h-2/3 border border-white overflow-auto flex flex-col-reverse ">
        <div className=" mr-5 ml-5 mt-3">
          {allMessages?.map((message) => (
            <Message
              key={message.content}
              message={message}
              isOwner={message.sender.id === user.id}
            />
          ))}
        </div>
      </div>
      <div className="  h-1/6 flex flex-row gap-5">
        <form
          className=" h-full w-full flex flex-row gap-5"
          onSubmit={handleSubmit(sendmessages)}
        >
          <Input
            className="border border-white h-full w-4/5 resize-none pl-2"
            placeholder="Sends a Message"
            {...register("content")}
          />
          <Button>
            <IoSend className=" text-3xl text-white" />
          </Button>
        </form>
      </div>
    </main>
  )
}

export default page