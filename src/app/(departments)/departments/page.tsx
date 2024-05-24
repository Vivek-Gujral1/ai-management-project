// import React from 'react'

// function DepartmentsPage() {
//   return (
//    <main className=' h-full flex flex-col gap-10'>
//      <div className=' h-1/4 w-full border border-white mt-4 '>
//       <div className=' flex flex-row justify-center mt-3'>
//       <h2 className=' text-white text-xl ' >Departments Members</h2>
//       <div>
//         <p className=' text-white'>Name</p>
//         <p className=' text-white'>Name</p>
//         <p className=' text-white'>Name</p>
//         <p className=' text-white'>Name</p>
//       </div>
//       </div>
//      </div>
//      <div className=' h-1/4 w-full border border-white '>
//         <h2 >Departments Members</h2>
//      </div>
//      <div className=' h-1/4 w-full border border-white '>
//         <h2 >Departments Members</h2>
//      </div>
//    </main>
//   )
// }

// export default DepartmentsPage

import UsersPage from '@/components/my-components/Members'
import React from 'react'

function page() {
  return (
  <UsersPage />
  )
}

export default page