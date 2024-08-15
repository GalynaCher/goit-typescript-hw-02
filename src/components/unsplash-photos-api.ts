import axios from "axios";
import { ApiResponse } from "../types";

axios.defaults.baseURL = "https://api.unsplash.com"
const accessKey = "VtWU6w8e5iAnDUrBNYGHqtnAJUCQzyRQ1pfG5d97zEs";



export const fetchPhotos = async (
    searchCriteria: string,
    currentPage: number
    ): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(`/search/photos`, {
        params: {
            client_id: accessKey,
            page: currentPage,
            per_page: 12,
            query: searchCriteria
        }
    });
    console.log("from unsplash-photos-api.js", response.data);
    return response.data;
};

