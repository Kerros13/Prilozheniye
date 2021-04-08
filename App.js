import React,{useState,useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation";
import LongTimers from "./src/utils/LongTimers";


export default function App() {
  LongTimers();

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}