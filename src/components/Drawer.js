import React from 'react';
import { View, StyleSheet,Text,Dimensions } from 'react-native';
import { Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { firebase } from "../firebase";
const {width, height} = Dimensions.get("window");



const signOut = ({navigation}) =>{
    try {
        firebase.auth()
        .signOut()
        .then(() => {
            console.log("success");
            const resetAction = navigation.dispatch( CommonActions.reset({index: 0,routes: [{ Name: 'Log', }, ], }) );
            navigation.navigate(resetAction);
        });

    } catch(error){
        console.log("err", error);
    }
}


export function DrawerContent(props) {

    return(
        <View style={{flex:1, backgroundColor:"#1E1E1E"}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../../assets/img_avatar.png')}
                                size={width*0.2}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Name</Title>
                                <Caption style={styles.caption}>@tag</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>##</Paragraph>
                                <Caption style={styles.caption}>Datos</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>##</Paragraph>
                                <Caption style={styles.caption}>Datos</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Entypo 
                                name="home" 
                                color="#fff"
                                size={size}
                                />
                            )}
                            label="Home"
                            style={{fontsize:width*0.04}}
                            labelStyle={{color:"#fff",fontSize:width*0.04}}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                    </Drawer.Section>

                    <Drawer.Section>
                        <TouchableRipple>
                            <View style={styles.preference}>
                                <Text style={{color:"#fff",fontSize:width*0.04}}>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Entypo 
                        name="home" 
                        color="#fff"
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{color:"#fff",fontSize:width*0.04}}
                    onPress={signOut}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: width*0.05,
        marginTop: 3,
        fontWeight: 'bold',
        color:"#fff",
    },
    caption: {
        fontSize: width*0.04,
        lineHeight: width*0.04,
        color:"#fff",
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        color:"#fff",
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color:"#fff",
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#666',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color:"#fff",
      },
});
