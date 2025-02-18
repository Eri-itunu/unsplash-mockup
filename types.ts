export type UnsplashResponse = {
    total: number;
    totalPages: number;
    results: resultsArray[];
}

export type resultsArray = {
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string
    },
    user:{
        name:string
        location:string
    }
}