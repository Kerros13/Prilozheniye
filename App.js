import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./src/screens/homeScreen";
import searchScreen from "./src/screens/searchScreen";
import loginScreen from "./src/screens/loginScreen";
import mainScreen from "./src/screens/mainScreen";
import Login from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo,FontAwesome } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TabBar from './src/components/TabBar.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs (){
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen} initialParams={{ icon2: 'home' }}/>
      <Tab.Screen name='Search' component={searchScreen} initialParams={{ icon3: 'search' }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={mainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signin"
            component={loginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tab"
            component={MyTabs}
            options={{ headerShown: false }}
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