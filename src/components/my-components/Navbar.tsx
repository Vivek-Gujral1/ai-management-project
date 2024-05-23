import React from "react";
import { Separator } from "@/components/ui/separator";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar"
import { CiSearch } from "react-icons/ci";


interface NavbarItem {
    name : String
    path : String
    icon : any
}



function Navbar() {

    const navItems : Array<NavbarItem> = [
        {
            name : "Home" ,
            path : "/",
            icon : <AiOutlineHome />
        } ,
        {
          name : "Departments" ,
          path : "/departments",
          icon : <AiOutlineHome />
      } ,
        {
            name : "Discussions" ,
            path : "/discussions" ,
            icon : <IoChatboxEllipsesOutline />
        } ,
        {
            name : "Tasks" ,
            path : "/tasks" ,
            icon : <FaTasks />
        } ,
        {
            name : "Video-Call" ,
            path : "/video-call" ,
            icon : <IoMdVideocam />
        } ,
    ]

    const profileItems : Array<NavbarItem> = [
      {
        name : " Your Profile" ,
        path : "/profile" ,
        icon : ""
      } ,
      {
        name : " Your Companies" ,
        path : "/comapnies" ,
        icon : ""
      } ,
      {
        name : " Your Departments" ,
        path : "/profile" ,
        icon : ""
      },
      {
        name : "Setting" ,
        path : "/settings" ,
        icon : ""
      }
    ]

  return (
    <>
      <nav className="h-14 flex flex-row items-center ml-4 justify-between mr-4">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">
                <GiHamburgerMenu className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"} >
              <SheetHeader>
                <SheetTitle className=" text-black">Management App</SheetTitle>
                <SheetDescription className=" text-black" >
                  Tracks all the Tasks of Employee and converts three apps into one app.
                </SheetDescription>
              </SheetHeader>
              <br />
              <Separator />
              <div className="grid gap-4 py-4">
                <div className="grid grid-rows-4 items-center gap-4">
                    {navItems.map((item )=>(
                        <Link  className=" flex flex-row items-center gap-2 h-8 hover:bg-slate-200 hover:rounded-md pl-2" href={`${item.path}`} >{item.icon} {item.name}</Link>
                    ))}
                
                </div>
              </div>
              
            </SheetContent>
          </Sheet>
        </div>

        <div className="  w-1/2 ">
          <Input  type="search"  placeholder={` Search here ...`}></Input>
        </div>

        <div className=" border border-white w-14 h-2/3">

        </div>

        <div>
        <Sheet>
            <SheetTrigger asChild>
            <Avatar>
              <AvatarFallback className=" cursor-pointer">CN</AvatarFallback>
            </Avatar>
            </SheetTrigger>
            <SheetContent side={"right"} >
              <SheetHeader>
                <SheetTitle className=" text-black">
                <Avatar>
              <AvatarFallback className=" cursor-pointer">CN</AvatarFallback>
            </Avatar>
                </SheetTitle>
                <SheetDescription className=" text-black" >
                  Tracks all the Tasks of Employee and converts three apps into one app.
                </SheetDescription>
              </SheetHeader>
              <br />
              <Separator />
              <div className="grid gap-4 py-4">
                <div className="grid grid-rows-4 items-center gap-4">
                    {profileItems.map((item )=>(
                        <Link  className=" flex flex-row items-center gap-2 h-8 hover:bg-slate-200 hover:rounded-md pl-2" href={`${item.path}`} >{item.icon} {item.name}</Link>
                    ))}
                
                </div>
              </div>
              
            </SheetContent>
          </Sheet>
        </div>
        
      </nav>
      <Separator className=" bg-gray-600 mt-2" />
    </>
  );
}

export default Navbar;
