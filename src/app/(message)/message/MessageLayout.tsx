import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function MessageLayout() {
  return (
    <div className=" flex flex-row justify-center items-center gap-8">
      

       <Link href={"/message/friends"}><Button>Friends</Button></Link>
       <Link href={"/message/company"}><Button>Companies</Button></Link>
       <Link href={"/message/departments"}><Button>Departments</Button></Link>
      </div>
  )
}

export default MessageLayout