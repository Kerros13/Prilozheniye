import React, {createContext,useState} from "react";
import {StyleSheet} from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{

    const [theme,setTheme] = useState("dark");

    const toggleTheme = ()=>{
        theme == "dark" ? setTheme("light") : setTheme("dark");
    }

    const ContextStyles = StyleSheet.create({
        containerdark:{
            backgroundColor:'#1E1E1E',
        },
        containerlight:{
            backgroundColor:"#E1E1E1"
        },
        textlight:{
            color:"#002c3e"
        },
        textdark:{
            color:"#fff"
        },
        headerlight:{
            backgroundColor:"#E7E6E5"
        },
        headerdark:{
            backgroundColor:"#18191A"
        },
        logodark:{
            color:"#BBFE1B"
        },
        logolight:{
            color:"#5caab0"
        },
        iconheaderlight:{
            color:"#F7444E"
        },
        iconheaderdark:{
            color:"#0159BB"
        }
    });

    return(
        <ThemeContext.Provider value={{theme,ContextStyles,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

