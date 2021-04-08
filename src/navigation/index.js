import React,{useContext,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import changePasswordScreen from "../screens/changePasswordScreen";
import MyTabs from "../components/navigation";
import loginScreen from "../screens/loginScreen";
import mainScreen from "../screens/mainScreen";
import Login from "../screens/Signin";
import Signup from "../screens/Signup";
import {DrawerContent} from '../components/Drawer.js';
import { Context as AuthContext } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();
const LStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function  LoginStack() {
  return(
    <LStack.Navigator>
      <LStack.Screen
              name="main"
              component={mainScreen}
              options={{ headerShown: false }}
            />
      <LStack.Screen
              name="signin"
              component={Login}
              options={{ headerShown: false }}
            />
      <LStack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <LStack.Screen
        name="chpassword"
        component={changePasswordScreen}
        options={{ headerShown: false }}
      />
    </LStack.Navigator>
  );
};

function drawer(){
  return(
      <Drawer.Navigator 
      initialRouteName="Home" 
      drawerPosition={"left"} 
      drawerContent= {props => <DrawerContent {...props}/>}
      drawerType="back"
    >
        <Drawer.Screen name="Home" component={MyTabs} 
        options={{
          title:'Home', swipeEnabled:false
        }}/>
        <Drawer.Screen name="Login" component={loginScreen} options={{
          title:'Login'
        }}/>
      </Drawer.Navigator>
  );
};

const Navigation = () => {
    const { state, persistLogin } = useContext(AuthContext);

    // Verificar si ya existen credenciales de autenticación
    useEffect(() => {
        persistLogin();
    }, []);

    // Prevenir que se oculte la pantalla de splash
    SplashScreen.preventAutoHideAsync();

    // Ocultar la pantalla de splash al verificar que existe un token de inicio
    if (!state.loading) SplashScreen.hideAsync();

    return(
        
        <NavigationContainer>
            
            {!state.loading && (
              <>

              {!state.loggedIn ? (
                <Stack.Navigator>
                  <Stack.Screen 
                    name="Log"
                    component={LoginStack}
                    options={{
                    animationEnabled: false,
                    headerShown: false
                    }}
                />
                </Stack.Navigator>
              )
              :(
                <Stack.Navigator>
                  <Stack.Screen 
                      name="App"
                      component={drawer}
                      options={{
                      animationEnabled: false,
                      headerShown: false
                      }}
                  />
                </Stack.Navigator>
              )}

              </>
            )}
            
        </NavigationContainer>
        
    )
};


export default Navigation;