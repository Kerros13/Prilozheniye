import React, {createContext,useEffect,useState} from "react";
import {StyleSheet,StatusBar} from "react-native";
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
        maindark:{
            backgroundColor:'#313030',
        },
        mainlight:{
            backgroundColor:"#E1E1E1"
        },
        signindark:{
            backgroundColor: "#0159BB",
        },
        signinlight:{
            backgroundColor: "#7f69a5",
        },
        signupdark:{
            backgroundColor: "#BBFE1B",
            color:"#000"
        },
        signuplight:{
            backgroundColor: "#F7444E",
            color:"#fff"
        },
        changedark:{
            backgroundColor: "#0159BB",
            color:"#000"
        },
        changelight:{
            backgroundColor: "#F7444E",
            color:"#fff"
        },
        hiperdark:{
            color:"#BBFE1B",
        },
        hiperlight:{
            color:"#5caab0",
        },
        containerdark:{
            backgroundColor:'#1E1E1E',
        },
        containerlight:{
            backgroundColor:"#E1E1E1",
        },
        textlight:{
            color:"#002c3e",
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
        },
        drawerContentlight:{
            color:"#002c3e"
        },
        drawerContentdark:{
            color:"#fff"
        },
        drawerIconlight:{
            color:"#F7444E"
        },
        drawerIcondark:{
            color:"#fff"
        },
        drawerSBlight:{
            borderTopColor:'#1E1E1E',
        },
        drawerSBdark:{
            borderTopColor:"#E1E1E1"
        },
        bottomtabdark:{
            backgroundColor:"#322E2E"
        },
        bottomtablight:{
            backgroundColor:'#b8b8b8',
        },
        musicdark:{
            backgroundColor:"#313030"
        },
        musiclight:{
            backgroundColor:'#E1E1E1',
        },
    });

    return(
        <ThemeContext.Provider value={{theme,ContextStyles,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

