export interface Photo {
    alt_description: string,
    id: string,
    description: string,
    urls: {
        small?: string,
        regular?: string,
    },
}

export interface ApiResponse {
    results: Photo[],
    total_pages: number
}