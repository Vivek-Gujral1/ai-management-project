import {z} from "zod"

export  const usernameValidation = z
    .string()
    .min( 2,"Username must be atleast 2 characters")
    .max(20 , "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters')

export const SignUpSchema = z.object({
    username : usernameValidation ,
    email    : z.string()
    .email({message : "invalid email address"}) ,
    password : z.string()
    .min(6 , {message : "Password must be atleast 6 Characters"})
    .max(20 , {message : "Password cotains only 20 characters"})
})