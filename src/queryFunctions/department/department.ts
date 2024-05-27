import { ApiResponse } from "@/types/ApiResponse"
import axios from "axios"


export const getDepartments = async () => {
    const response = await axios.get<ApiResponse>(`/api/department/get-departments`)
    console.log("response" , response);
    
    if (response.data.success) {
        return response.data.departments
    }
}