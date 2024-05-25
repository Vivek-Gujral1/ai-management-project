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
    <main className=" h-full w-full">
      <section className=" h-1/4 w-full  p-4 flex flex-col gap-6">
        <div className=" h-1/2 w-full  flex flex-row gap-6 items-center">
          <div className=" h-24 w-24 rounded-full border border-white">
            <img src="" alt="" />
          </div>
          <div className=" flex flex-col gap-2 ">
            <h2 className=" text-white text-2xl">{userProfileData?.name}</h2>
          </div>
        </div>
        <div className=" h-1/2 w-full  ">
          <p className=" text-white break-words">
            sfhdtghflghtfsgfjhdtgjrdghtojfrdghjrhjfdgghf;kgfkhkfghnf
          </p>
        </div>
        <div className=" mb-4">
          <Link className="flex flex-row items-center gap-2 h-8 text-white pl-2" href={"/"}><IoChatboxEllipsesOutline />Send Message</Link>
        </div>
      </section>
      <br />
      <Separator />
      <br />
      <section className=" ">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Departments</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default Profile;
