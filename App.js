import React,{useState,useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider} from "react-native-paper";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import {ThemeProvider} from "./src/theme";
import { SongGlobal } from "./src/context/SongContext";
import Navigation from "./src/navigation";
import LongTimers from "./src/utils/LongTimers";



export default function App() {
  LongTimers();


  return (
    <AuthProvider>
      <SongGlobal>
        <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
        </ThemeProvider>
      </SongGlobal>
    </AuthProvider>
  );
}