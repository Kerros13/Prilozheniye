import Constant from "expo-Constant"

const ENV = {
    dev: {
        apikey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
    },
    production: {
        apikey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
    }

};

const getEnvVars = (env = Constant.manifest.releaseChannel) => {
    if (_DEV_) return ENV.dev;
    else if (env === "production" || env === "default") return ENV.production;
};

export default getEnvVars;