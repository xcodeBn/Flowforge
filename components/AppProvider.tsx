"use client"
import React, {useState} from 'react'
import {ThemeProvider} from "next-themes";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider, useQueryClient} from "@tanstack/react-query";

const AppProvider = ({children} : {children:React.ReactNode}) => {
    const [queryClient] = useState(()=>new QueryClient());


    return (<QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={"system"} attribute={"class"} enableSystem>
        {children}
        </ThemeProvider>
        </QueryClientProvider>
    )
}
export default AppProvider
