import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Button, Alert ,  View, BackHandler} from 'react-native';

import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Alertas from './Alertas';
import Avisos from './Avisos';
import Listado from './Listado';
import Marcar from './Marcar_asistencia';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
// Typescript

import Icon from 'react-native-vector-icons/Feather';



const Tab = createBottomTabNavigator();

const Tabs = AnimatedTabBarNavigator();


export default function PrincipalTab(props) {


  return (
    // <Tabs.Navigator 
    
    // screenOptions={{animation: 'slide_from_right'}}
    // tabBarOptions={{
    //     activeTintColor: "#ffff",
    //     inactiveTintColor: "#000",
    //     activeBackgroundColor: "#e5cfff",
    //   }}
    
    // // tabBar={(props) => (
    // //     <Animated.View
    // //       entering={FadeInUp}
    // //       exiting={FadeOutDown}
    // //       layout={Layout.duration(100)}
    // //       style={{
    // //         height: 80,
    // //       }}
    // //     >
    // //       <BottomTabBar {...props} />
    // //     </Animated.View>
    // //   )}

    //     >
    //     <Tabs.Screen name="Alertas" component={Alertas} 

    //       options={{
            
    //         tabBarIcon: ({ focused, color, size }) => (
    //             <Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> 
    //         )
    //       }}
          
    //     />
    //     <Tabs.Screen name="Avisos" component={Avisos} 
    //       options={{
    //         tabBarIcon: ({ focused, color, size }) => (
    //             <Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> 
    //         )
    //       }}
    //     />
    //     <Tabs.Screen name="Listado" component={Listado}
    //       options={{
    //         tabBarIcon: ({ focused, color, size }) => (
    //             <Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> 
    //         )
    //       }}
    //     />
    //     <Tabs.Screen name="Marcar" component={Marcar}
    //       options={{
    //         tabBarIcon: ({ focused, color, size }) => (
    //             <Ionicons name='md-calendar-sharp' size={20} color='#2B3A55' /> 
    //         )
    //       }}
    //     />

    // </Tabs.Navigator>
    <View></View>
  );
}