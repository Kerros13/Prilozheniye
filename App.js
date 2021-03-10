import React,{useState,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "./src/screens/homeScreen";
import searchScreen from "./src/screens/searchScreen";
import loginScreen from "./src/screens/loginScreen";
import mainScreen from "./src/screens/mainScreen";
import Login from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import Prueba1 from "./src/screens/Pruebas/Prueba1";
import Prueba2 from "./src/screens/Pruebas/Prueba2";
import Prueba3 from "./src/screens/Pruebas/Prueba3";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabBar from './src/components/TabBar.js';
import {DrawerContent} from './src/components/Drawer.js'
import Header from './src/components/Header.js';
import { LogBox } from 'react-native';
import PersistLogin from "./src/firebase/persistLogin";
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
const LStack = createStackNavigator();
const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
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
    </LStack.Navigator>
  );
};

function  HomeStack({navigation}) {
  return(
    <HStack.Navigator>
      <HStack.Screen
        name='Home' 
        component={HomeScreen}
        options={{
          headerTitle: () => <Header title='Home' navigation={navigation} x={false}/>,
          headerLeft: null,
          headerStyle: {backgroundColor: "#18191A"}
        }}
      />
    </HStack.Navigator>
  );
};

function MyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Prueba1" component={Prueba1} />
      <TopTab.Screen name="Prueba2" component={Prueba2} />
      <TopTab.Screen name="Prueba3" component={Prueba3} />
    </TopTab.Navigator>
  );
}

function  MyTopTabsStack({navigation}) {
  return(
    <HStack.Navigator>
      <HStack.Screen
        name='TopTaps' 
        component={MyTopTabs}
        options={{
          headerTitle: () => <Header title='TopTaps' navigation={navigation} x={true}/>,
          headerLeft: null
        }}
      />
    </HStack.Navigator>
  );
};

function  MyTabs() {
  return(
    <Tab.Navigator tabBar={props => <TabBar {...props} initialRouteName="Home" />}>
      <Tab.Screen name='Home' component={HomeStack} initialParams={{ icon2: 'home' }}/>
      <Tab.Screen name='Search' component={searchScreen} initialParams={{ icon3: 'search' }}/>
      <Tab.Screen name='Prueba' component={MyTopTabsStack} initialParams={{ icon2: 'tools' }}/>
    </Tab.Navigator>
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

  const [user, setUser] = useState({});

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    const userData = PersistLogin();
    setUser(userData);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? 
            <Stack.Screen 
            name="App"
            component={drawer}
            options={{
              animationEnabled: false,
              headerShown: false
            }}
            />
          :
          
          <Stack.Screen 
          name="Log"
          component={LoginStack}
          options={{
            animationEnabled: false,
            headerShown: false
          }}
          />}
        
          
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