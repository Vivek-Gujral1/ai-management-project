"use client"
import { TaskCard } from '@/components/my-components/TaskCard'
import { getUserTasks } from '@/queryFunctions/tasks/tasks'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function page() {
    const {data : tasks , isLoading} = useQuery({
        queryKey : ["tasks/user"],
        queryFn : async () => await getUserTasks()
    })
    
  return (
    <div className=' flex flex-col gap-4 w-full'>
     {tasks ? tasks.map((task)=>(
        <TaskCard task={task} />
     )) : null}
    </div>
  )
}

export default page