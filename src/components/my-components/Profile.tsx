"use client"
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/queryFunctions/profile/profile";
import { Skeleton } from "../ui/skeleton";

function Profile({userId}: {userId : string}) {
    const {data : userProfileData , isLoading} = useQuery({
        queryKey : ["profile/user"],
        queryFn : async() => await getUserProfile(userId)
    })
    if (isLoading) {
        <Skeleton />
    }
  return (
    <main className=" h-full w-full mt-4">
      <section className=" h-1/4 w-full  p-4 flex flex-col gap-6">
        <div className=" h-1/2 w-full  flex flex-row gap-6 items-center">
          <div className=" h-24 w-24 rounded-full border border-black">
            <img src="" alt="" />
          </div>
          <div className=" flex flex-col gap-2 ">
            <h2 className="  text-3xl font-semibold">{userProfileData?.name}Vivek Gujral</h2>
          </div>
        </div>
        <div className=" h-1/2 w-full  ">
          <p className="  break-words">
            Mern Stack and Nextjs Web Developer  
          </p>
        </div>
        <div className=" ">
          <Link className="flex flex-row items-center gap-2 h-8  pl-2" href={"/"}><IoChatboxEllipsesOutline />Send Message</Link>
        </div>
      </section>
      <br />
      <Separator />
      <br />
     <section>
     <div className=" flex flex-row justify-center items-center">
      <h2 className=" text-xl font-medium">Work in Companies</h2>
     </div>
     </section>
    </main>
  );
}

export default Profile;
