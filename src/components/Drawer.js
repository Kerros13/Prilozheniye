import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet,Text,Dimensions,ActivityIndicator } from 'react-native';
import { Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch } from 'react-native-paper';
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get("window");
import { Context as AuthContext, Context } from "../context/AuthContext";
import { ThemeContext } from "../theme";


export function DrawerContent(props) {

    const { state, signout } = useContext(AuthContext);
    const [ready,setReady] = useState(false);
    const {theme,toggleTheme, ContextStyles} = useContext(ThemeContext);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    useEffect(() => {
        theme == "dark" ? setIsSwitchOn(false) : setIsSwitchOn(true)
    }, []);

    useEffect(() => {
        if (state.user) setReady(true)
    }, [state]);

    if(!ready){
        return(

            <ActivityIndicator size="large" color="blue" backgroundColor="#1E1E1E"/>

        )
    }

    const onToggleSwitch = () =>{
        setIsSwitchOn(!isSwitchOn)
        toggleTheme()
    }

    return(
        <View style={[{flex:1},ContextStyles[`container${theme}`]]}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={state.user.pictureUrl ? {uri:state.user.pictureUrl} : require('../../assets/img_avatar.png')}
                                size={width*0.15}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={[styles.title,ContextStyles[`drawerContent${theme}`]]}>{state.user.name}</Title>
                                <Caption style={[styles.caption, ContextStyles[`drawerContent${theme}`]]}>@tag</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption, ContextStyles[`drawerContent${theme}`]]}>##</Paragraph>
                                <Caption style={[styles.caption, ContextStyles[`drawerContent${theme}`]]}>Datos</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption, ContextStyles[`drawerContent${theme}`]]}>##</Paragraph>
                                <Caption style={[styles.caption, ContextStyles[`drawerContent${theme}`]]}>Datos</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Entypo 
                                name="home" 
                                color = {ContextStyles[`drawerIcon${theme}`].color}
                                size={width*0.07}
                                />
                            )}
                            label="Home"
                            style={{fontsize:width*0.04}}
                            labelStyle={[{fontSize:width*0.04},ContextStyles[`drawerContent${theme}`]]}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Entypo 
                                name="tools" 
                                color={ContextStyles[`drawerIcon${theme}`].color}
                                size={width*0.07}
                                />
                            )}
                            label="Prueba"
                            style={{fontsize:width*0.04}}
                            labelStyle={[{fontSize:width*0.04},ContextStyles[`drawerContent${theme}`]]}
                            onPress={() => {props.navigation.navigate('Prueba')}}
                        />
                    </Drawer.Section>

                    <Drawer.Section>
                        
                            <View style={styles.preference}>
                                <Text style={[{fontSize:width*0.04},ContextStyles[`drawerContent${theme}`]]}>Light Theme</Text>
                                <View>
                                <Switch style={{ transform: [{ scaleX: width*0.0028 }, { scaleY: width*0.0028 }] }} value={isSwitchOn} thumbColor={isSwitchOn ? "#78bcc4" : "#fff" } trackColor={{true: '#78bcc4', false: 'grey'}} onValueChange={onToggleSwitch} />
                                </View>
                            </View>
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={[styles.bottomDrawerSection,ContextStyles[`drawerSB${theme}`]]}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialCommunityIcons 
                            name="logout" 
                            size={width*0.07} 
                            color={ContextStyles[`drawerIcon${theme}`].color} 
                        />
                    )}
                    label="Cerrar Sesión"
                    labelStyle={[{fontSize:width*0.04},ContextStyles[`drawerContent${theme}`]]}
                    onPress={() => (signout())}
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
    },
    caption: {
        fontSize: width*0.04,
        lineHeight: width*0.04,
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
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopWidth: 0.5
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color:"#fff",
      },
});
