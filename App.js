import React,{useState,useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AuthProvider } from "./src/context/AuthContext";
import AudioProvider from "./src/context/AudioProvider";
import {ThemeProvider} from "./src/theme";
import Navigation from "./src/navigation";
import LongTimers from "./src/utils/LongTimers";




export default function App() {
  LongTimers();


  return (
    <AuthProvider>
      <AudioProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </ThemeProvider>
      </AudioProvider>
    </AuthProvider>
  );
}