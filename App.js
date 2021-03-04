import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/screens/homeScreen";
import searchScreen from "./src/screens/searchScreen";
import loginScreen from "./src/screens/loginScreen";
import mainScreen from "./src/screens/mainScreen";
import Login from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TabBar from './src/components/TabBar.js';
import Header from './src/components/Header.js';

const Stack = createStackNavigator();
const LStack = createStackNavigator();
const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
          headerTitle: () => <Header title='Home' navigation={navigation}/>,
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
    </Tab.Navigator>
  );
};

function drawer(){
  return(
      <Drawer.Navigator 
      initialRouteName="Home" 
      drawerPosition={"right"} 
      drawerStyle={{backgroundColor:'#1c2134'}} 
      drawerType="back"
      drawerContentOptions={{
        inactiveTintColor:'#ffffff'
      }}>
        <Drawer.Screen name="Home" component={MyTabs} 
        options={{
          title:'Home',
          drawerIcon: ({ focused, size }) => (
            <Entypo name="home" size={20} color={focused ? "blue" : null} />
          )
        }}/>
        <Drawer.Screen name="Login" component={loginScreen} options={{
          title:'Login'
        }}/>
      </Drawer.Navigator>
  );
};

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});







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