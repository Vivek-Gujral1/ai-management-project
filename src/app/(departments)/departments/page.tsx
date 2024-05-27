"use client"
import { DepartmentCard } from '@/components/my-components/DepartmentsCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Link from 'next/link' 
import { getDepartments } from '@/queryFunctions/department/department'

function page() {
    const {data : departments , isLoading} = useQuery({
        queryKey : ["departments"],
        queryFn : async () => getDepartments()
    })
    if (isLoading) {
        return <Skeleton />
    }
    if(!departments || departments.length  === 0){
       return <h1 className=' '>Nothing to show</h1>
    }
  return (
    <>
    <Link href={"/companies/create-company"}><Button variant="default">Create Company</Button></Link>
    <main className=' flex flex-col gap-5 mt-5 lg:grid lg:grid-cols-2 lg:gap-3 '>
    {departments.map((department)=>(
     <DepartmentCard message={department} />
    ))}
   </main>
   </>
  )
}

export default page