import { ApiResponse } from "@/types/ApiResponse"
import axios, { AxiosError } from "axios"


export const getMessages  = async(socketRoomName : string) => {
   try {
    const response = await axios.get<ApiResponse>(`/api/message/get-messages?GroupSocketRoomName=${socketRoomName}`)

    if (response.data.success) {
        return response.data.messages
    }

   } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>
        console.log(axiosError);
   }
}