import React from 'react'
import { Button } from '@/components/ui/button'

function MessageLayout() {
  return (
    <div className=" flex flex-row justify-center items-center gap-8">
      

       <Button>Friends</Button>
       <Button>Companies</Button>
       <Button>Departments</Button>
      </div>
  )
}

export default MessageLayout