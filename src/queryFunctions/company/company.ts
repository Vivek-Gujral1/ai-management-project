import { ApiResponse } from "@/types/ApiResponse"
import axios from "axios"


export const getCompanies = async () => {
    const response = await axios.get<ApiResponse>("/api/company/get-companies")
    console.log("response" , response);
    
    if (response.data.success) {
        return response.data.companies
    }
}