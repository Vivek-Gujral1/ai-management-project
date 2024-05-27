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

import { SubmitHandler, useForm } from 'react-hook-form'
import Chat from '@/components/my-components/Chat'


interface FormType {
  content : string
}

function page() {
  const {register , handleSubmit , reset} = useForm()
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


  const sendmessages: SubmitHandler<FormType> = async (data) => {
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

    const allMessages = [...(backendMessages ?? []), ...Messages];
  console.log(allMessages);
  };

  return (
    <main className=' h-full w-full'>
    <Chat/>
    </main>
  )
}

export default page