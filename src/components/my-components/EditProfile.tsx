"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useForm} from "react-hook-form"

export function DialogDemo() {
    const {handleSubmit , register} = useForm()

    const updateProfile = async(data : any) => {
console.log( "profile data",data);

    } 
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(updateProfile)}>
        <div className="grid gap-4 py-4">
            
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Headline
            </Label>
            <Input id="name" placeholder="Update Headline" className="col-span-3" {...register("headline")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Avatar
            </Label>
            {/* <Input type="file" id="username" value="@peduarte" className="col-span-3" /> */}
            <Input className="col-span-3" type="file" {...register("avatar")} />
          </div>
         
        </div>
       
        <DialogFooter>
        <Button type="submit">Delete Avatar</Button>
        <Button type="submit">Save changes</Button>
      
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
