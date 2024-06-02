"use client"
import { getFriends } from '@/queryFunctions/friends/friends'
import { useQuery } from '@tanstack/react-query'
import React from 'react'


function Friends() {
  const {data : friends , isLoading} = useQuery({
    queryKey : ["friends"] ,
    queryFn  : async () => await getFriends()
  })
  return (
    <div>Friends</div>
  )
}

export default Friends