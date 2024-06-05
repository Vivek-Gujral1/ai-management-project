"use client"
import { TaskCard } from '@/components/my-components/TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getUserTasks } from '@/queryFunctions/tasks/tasks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSocket } from '@/app/custom-Hooks/SocketProvider'

function page() {
    const {data : tasks , isLoading} = useQuery({
        queryKey : ["tasks/user"],
        queryFn : async () => await getUserTasks()
    })
    const {} = useSocket()

    if (isLoading) {
      return <Skeleton className=' bg-slate-700'/>
    }
    
  return (
    <div className=' flex flex-col gap-4 w-full'>
     {tasks ? tasks.map((task)=>(
        <TaskCard task={task} />
     )) : null}
    </div>
  )
}

export default page