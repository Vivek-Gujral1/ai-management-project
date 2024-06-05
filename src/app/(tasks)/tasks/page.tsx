"use client"
import { TaskCard } from '@/components/my-components/TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getUserTasks } from '@/queryFunctions/tasks/tasks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSocket } from '@/app/custom-Hooks/SocketProvider'

function page() {
    const {data : backendtasks , isLoading} = useQuery({
        queryKey : ["tasks/user"],
        queryFn : async () => await getUserTasks()
    })
    const {Tasks} = useSocket()

    if (isLoading) {
      return <Skeleton className=' bg-slate-700'/>
    }

    const allTasks = [...(backendtasks ?? []) , ...Tasks]
    
  return (
    <div className=' flex flex-col gap-4 w-full'>
     {allTasks ? allTasks.map((task)=>(
        <TaskCard task={task} />
     )) : null}
    </div>
  )
}

export default page