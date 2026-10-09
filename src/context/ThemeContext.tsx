import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Theme, ThemeContextType } from "../types/theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeState() {
    const [theme , setTheme] = useState<Theme>(()=>{
        const savedTheme = localStorage.getItem("theme") as Theme | null
        if (savedTheme) return savedTheme

        return window.matchMedia('(prefers-color-scheme:dark)').matches ? "dark" : "light";
    })

    useEffect(()=>{
        const root = document.documentElement
        if(theme === 'dark'){
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
        localStorage.setItem("theme",theme)
    },[theme])

    const toggleTheme = () =>{
        setTheme((prev)=>(prev === "dark"? "light" : "dark"))
    }

    return (
        {theme, toggleTheme}
    )
}

export function ThemeProvider({children}: {children: ReactNode}){
    const themeState = useThemeState();
    return <ThemeContext.Provider value={themeState}>
        {children}
    </ThemeContext.Provider>
}

export function useThemeContext(){
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }

    return context;
}