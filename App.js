import React,{useState,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import changePasswordScreen from "./src/screens/changePasswordScreen";
import MyTabs from "./src/components/navigation";
import loginScreen from "./src/screens/loginScreen";
import mainScreen from "./src/screens/mainScreen";
import Login from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {DrawerContent} from './src/components/Drawer.js'
import { LogBox } from 'react-native';
import PersistLogin from "./src/firebase/persistLogin";
LogBox.ignoreLogs(['Setting a timer']);

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

export default function App() {

  // const [user, setUser] = useState({});

  // // Verificar si ya existen credenciales de autenticación
  // useEffect(() => {
  //   const userData = PersistLogin();
  //   setUser(userData);
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Log"
            component={LoginStack}
            options={{
              animationEnabled: false,
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="App"
            component={drawer}
            options={{
              animationEnabled: false,
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}







// function MyTabs() {
//   return (
//     <Tab.Navigator tabBarOptions={{
//         style:{
//           backgroundColor:'#fff',
//           borderRightColor:'#aaa',
//         },
//         activeBackgroundColor:'#e8e8e8',
//         inactiveTintColor:'#aaa',
//         labelStyle:{
//           fontSize:15
//         }
//     }}>
//         <Tab.Screen name="homeScreen" component={HomeScreen} options={{
//           title:'Home',
//           tabBarIcon:({color,size}) =>(
//             <Entypo name="home" size={size} color={color} />
//           ),
//         }} />
//         <Tab.Screen name="searchScreen" component={searchScreen} options={{
//           title:'Search',
//           tabBarIcon:({color,size}) =>(
//             <FontAwesome name="search" size={size} color={color} />
//           ),
//         }} />
        
//     </Tab.Navigator>
//   );
// }