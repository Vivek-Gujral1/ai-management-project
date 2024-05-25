"use client"
import { useRouter } from 'next/navigation'
import { useSocket } from '@/app/custom-Hooks/SocketProvider'
import { Companies } from '@/types/ApiResponse'
import React from 'react'
import {  useDispatch } from 'react-redux'
import { useQueryClient } from "@tanstack/react-query";
import { inCompany } from '@/store/company/slice'
import { AppDispatch } from '@/store/store'


function CompaniesCard({Company} : {Company : Companies}) {
  const RoomJoin = async () => {
    const res = await joinRoom(Company.sokcetRoomName);
    console.log(`join Room Response ${res} `);
    return res;
  };
  const queryClient = useQueryClient();
  const {joinRoom , clearMessages} = useSocket()
  const dispatch : AppDispatch = useDispatch()
  const router = useRouter()

  const handleClick = async ()=> {
    const res = await RoomJoin()
    if (res) {
      dispatch(inCompany(Company))
      await queryClient.invalidateQueries({queryKey : ['company/messages']})
      clearMessages()
      router.push(`/message/company/${Company.id}`)
    }
  }
  return (
    <div onClick={async()=> await handleClick()} className="bg-white shadow-md rounded-md p-4 flex items-center cursor-pointer ">
    {/* <img className="w-16 h-16 rounded-full mr-4 border border-white" src="" alt="User Avatar" /> */}
    
    <div className=' ml-3'>
      <h2 className="text-xl font-semibold">{Company.name}</h2>
      <p className="text-gray-600">{Company.email}</p>
      {/* <p className="text-gray-800">{headline}</p> */}
    </div>
  </div>
  )
}

export default CompaniesCard