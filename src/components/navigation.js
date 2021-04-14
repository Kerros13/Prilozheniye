import React,{useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/homeScreen";
import searchScreen from "../screens/searchScreen";
import songsbyAlbumScreen from "../screens/songsbyAlbumScreen";
import List from "../screens/Music/list";
import Player from "../screens/Music/player";
import artistScreen from "../screens/artistScreen";
import genreScreen from "../screens/genreScreen";
import TabBar from './TabBar.js';
import Header from './Header.js';
import { ThemeContext } from "../theme";
import { Modal } from 'react-native-paper';

//const S_Stack = createStackNavigator();
const HStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function  HomeStack({navigation}) {
    const {theme, ContextStyles} = useContext(ThemeContext); 
    return(
        <HStack.Navigator>
            <HStack.Screen
            name='Home' 
            component={HomeScreen}
            options={{
                headerTitle: () => <Header title='Home' navigation={navigation} x={false}/>,
                headerLeft: null,
                headerStyle: {backgroundColor: ContextStyles[`header${theme}`].backgroundColor}
            }}
            />
             <HStack.Screen
                  name="artist"
                  component={artistScreen}
                  options={{
                  animationEnabled: false,
                  headerShown: false,
                  }}
                />
                <HStack.Screen
                  name="genre"
                  component={genreScreen}
                  options={{
                  animationEnabled: false,
                  headerShown: false
                  }}
                />
                <HStack.Screen
                  name="songsbyalbum"
                  component={songsbyAlbumScreen}
                  options={{
                  animationEnabled: false,
                  headerShown: false
                  }}
                />
        </HStack.Navigator>
    );
};

// function SearchStack({navigation}){
//     const {theme, ContextStyles} = useContext(ThemeContext); 
//     return(
//         <S_Stack.Navigator>
//             <S_Stack.Screen
//             name='Home' 
//             component={searchScreen}
//             options={{
//                 headerTitle: () => <Header title='Home' navigation={navigation} x={false}/>,
//                 headerLeft: null,
//                 headerStyle: {backgroundColor: ContextStyles[`header${theme}`].backgroundColor}
//             }}
//             />
//         </S_Stack.Navigator>
//     );
// }

function MyTopTabs() {
    return (
        
        <TopTab.Navigator
        initialRouteName="Player"
            tabBarOptions={{
                style: {
                    display: 'none'
                },
          }}
        >
            <TopTab.Screen name="List" component={List} />
            <TopTab.Screen name="Player" component={Player} />
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
                headerShown: false,
                // headerTitle: () => <Header title='TopTabs' navigation={navigation} x={true}/>,
                // headerLeft: null,
                // headerStyle: {backgroundColor: "#18191A"}
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
            <Tab.Screen name='Player' component={MyTopTabsStack} initialParams={{ icon4: 'compact-disc' }}/>
        </Tab.Navigator>
    );
};

export default MyTabs;