import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";

export const getUserProfile = async (userId :string) => {
     try {
        console.log(userId);
        
        const response = await axios.get<ApiResponse>(`/api/users/get-user?userId=${userId}`)
        return response.data.user
     } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        console.log(axiosError);
        
     }
     
}