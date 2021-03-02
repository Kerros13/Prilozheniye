import axios from "axios";
import { processColor } from "react-native";
import getEnvVars from "../../environment";

const {apiURL} = getEnvVars();

const instance = axios.create({
    baseURL:apiURL
});

export default instance;