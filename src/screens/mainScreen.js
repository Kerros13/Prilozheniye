import React from "react";
import { View,StyleSheet,Text } from "react-native";
import { Button,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const mainScreen = ({navigation}) => {

    return(
        <View style={{flex:1}}>
            <Header centerComponent={{ text: 'Priloz', style: { color: '#fff',fontSize:30 } }}/>
            <View style={styles.container}>
                <Button
                    buttonStyle={styles.btn}
                    raised={true}
                    title="Sign-In"
                    type="outline"
                    onPress={()=>{navigation.navigate("signin")}}
                />
                <Text></Text>
                <Button
                    buttonStyle={styles.btn}
                    raised={true}
                    title="Sign-Up"
                    type="outline"
                    onPress={()=>{navigation.navigate("signup")}}
                />
                <Text></Text>
                <Button
                    buttonStyle={styles.btn}
                    raised={true}
                    title="Tabs"
                    type="outline"
                    onPress={()=>{navigation.navigate("tab")}}
                />
            </View>
        </View>

    )

};


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        width:200,
        height:100,
        borderRadius:50,
    }


})

export default mainScreen;