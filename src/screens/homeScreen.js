import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,Text} from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";


const {apikeyM} = getEnvVars()


const HomeScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [error,setError] = useState(false);

    const getTracks = async() => {
        try {
            const response = await backend.get(`track.get?commontrack_id=5920049&apikey=${apikeyM}`);
            console.log(response);
        } catch (error) {
            setError(true);
            //console.log(error);
            console.log(error);
        }
        
        
    }

    useEffect(()=>{

        getTracks();

    },[])


    if(!tracks){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffff'}}>
                <Text>No se han encontrado canciones</Text>
            </View>
        )
    }
    


};


const styles = StyleSheet.create({



})


export default HomeScreen;