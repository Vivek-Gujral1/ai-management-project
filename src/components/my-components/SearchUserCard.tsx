"use client"
import { useRouter } from 'next/navigation'
import {  user } from '@/types/ApiResponse'
import React from 'react'
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar"


function SearchUserCard({user} : {user : user }) {
  const queryClient = useQueryClient();
  const router = useRouter()

  const handleClick = async ()=> {
      await queryClient.invalidateQueries({queryKey : ['profile/user']})
      router.push(`/profile/${user.id}`)
    
  }
  return (
    <Card onClick={async() => await handleClick()} className="card-bordered cursor-pointer ">
      <CardHeader>
        <div className="flex gap-6 items-center">
          <Avatar  >
            <AvatarFallback >CN</AvatarFallback>
            <AvatarImage src={user.avatar ? user.avatar : ""} ></AvatarImage>
          </Avatar>
          <CardTitle>{user.name}</CardTitle>
         
        </div>
        <p>{user.headline }</p>
        <div className="text-sm ">
         <span className=' text-md'>Since</span> {dayjs(user.createdAt).format('MMM D, YYYY ')}
        </div>
      </CardHeader>
    </Card>
  )
}

export default SearchUserCard