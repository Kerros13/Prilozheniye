import React, { useReducer,useState } from "react";
import createDataContext from "./createDataContext";
import { Audio } from 'expo-av';

export const SongContext = React.createContext();

const initialState = {
  searchState: "home",
  searchResult: [],
  relatedVideos: [],
  menuOpen: false,
  snackbarMsg: false,
  currentVideoSnippet: {},
  themeSelectValue: "Default",
  audio:{}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentVideoSnippet":
      return {
        ...state,
        currentVideoSnippet: action.snippet
      };
    case "setAudio":
      return {
        ...state,
        audio: action.snippet
      };
    case "setThemeSelectValue": {
      return {
        ...state,
        themeSelectValue: action.snippet
      };
    }
    case "setMenuOpen": {
      return {
        ...state,
        menuOpen: action.snippet
      };
    }
    default:
      return state;
  }
};


export const SongGlobal = props => {
  const globalState = useReducer(reducer,initialState);
  return (
    <SongContext.Provider value={globalState}>
      {props.children}
    </SongContext.Provider>
  );
};
