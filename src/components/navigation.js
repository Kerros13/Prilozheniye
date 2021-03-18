import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/homeScreen";
import searchScreen from "../screens/searchScreen";
import Prueba1 from "../screens/Pruebas/Prueba1";
import Prueba2 from "../screens/Pruebas/Prueba2";
import Prueba3 from "../screens/Pruebas/Prueba3";
import TabBar from './TabBar.js';
import Header from './Header.js';


const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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
};
  
function  MyTopTabsStack({navigation}) {
    return(
        <HStack.Navigator>
        <HStack.Screen
            name='TopTaps' 
            component={MyTopTabs}
            options={{
                headerTitle: () => <Header title='TopTabs' navigation={navigation} x={true}/>,
                headerLeft: null,
                headerStyle: {backgroundColor: "#18191A"}
            }}
        />
        </HStack.Navigator>
    );
};

const  MyTabs = () => {
    return(
        <Tab.Navigator tabBar={props => <TabBar {...props} initialRouteName="Home" />}>
            <Tab.Screen name='Home' component={HomeStack} initialParams={{ icon2: 'home' }}/>
            <Tab.Screen name='Search' component={searchScreen} initialParams={{ icon3: 'search' }}/>
            <Tab.Screen name='Prueba' component={MyTopTabsStack} initialParams={{ icon2: 'tools' }}/>
        </Tab.Navigator>
    );
};

export default MyTabs;