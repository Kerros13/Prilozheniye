import React, {createContext,useEffect,useState} from "react";
import {StyleSheet} from "react-native";
import { AsyncStorage } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{

    const [theme,setTheme] = useState("");

    const getCurrentTheme = async () => {
       try {
        const currentTheme = await AsyncStorage.getItem("currentTheme");

        if(currentTheme == null){
            setTheme("dark");
            await AsyncStorage.setItem("currentTheme","dark");
        }else{
            setTheme(currentTheme);
        }
       } catch (error) {
           console.log(error);
       }

    }

    useEffect(()=>{

        getCurrentTheme()
        
    },[])
    

    const toggleTheme = async()=>{
        if(theme == "dark"){
            setTheme("light");
            await AsyncStorage.setItem("currentTheme","light");
        }else{
            setTheme("dark");
            await AsyncStorage.setItem("currentTheme","dark");
        }
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

