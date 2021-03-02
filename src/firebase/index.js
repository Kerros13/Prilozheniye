import firebase from "@react-native-firebase/app";

import getEnvVars from "../../environment";

const {
  apiKeyF,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = getEnvVars();

// Valores de la configuración de Firebase
const firebaseConfig = {
  apiKey: apiKeyF,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Iniciarlizar firebase si no existe una instancia ejecutándose
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };