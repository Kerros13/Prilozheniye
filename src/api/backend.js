import axios from "axios";
import { processColor } from "react-native";
import getEnvVars from "../../environment";

const {apiURL} = getEnvVars();
const {youtubeKey} = getEnvVars();

export const backend = axios.create({
    baseURL:apiURL
});

export const youtubeSearch = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
      part: "snippet",
      videoCategoryId: "10",
      type: "video",
      key: youtubeKey
    }
});

export const musicAPI = axios.create({
  baseURL: 'https://server.ylight.xyz',
  // baseURL: 'https://ylight.glitch.me',
});
