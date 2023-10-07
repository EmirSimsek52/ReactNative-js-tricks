// AppNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Discover from './Discover';
import Detail from './Detail';
import Products from './Products';
import CustonTabBarIcon from '../tabBarIcons/CustonTabBarIcon';
import Fav from './Fav';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    const tabBarOptions = {
        style: {
          backgroundColor: 'blue', 
    
        },
        labelStyle: {
          fontSize: 12, // Sekme başlıklarının yazı boyutu
          fontWeight: 'bold', // Sekme başlıklarının kalınlığı
        },
        
   // Aktif olmayan sekme başlığı rengi
      };
      
  return (
   
    <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor: '#0DA54B',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' , borderTopRightRadius:20,borderTopLeftRadius:20 },
      }}    
      initialRouteName='Discover'
      >
      <Tab.Screen 
          name='Discover' 
          component={Discover} 
          options={{
            tabBarLabel: 'Home', // Sekme başlığı
            tabBarIcon: ({ focused }) => (
              <CustonTabBarIcon name={'home'} focused={focused} />
            ),
          }}
        />
      <Tab.Screen 
      name='Products' 
      component={Products}
      options={{
        tabBarLabel: 'Shop', // Sekme başlığı
        tabBarIcon: ({ focused }) => (
          <CustonTabBarIcon name={'shopping-bag'} focused={focused} />
        ),
      }}
      />
            <Tab.Screen 
      name='Fav' 
      component={Fav}
      options={{
        tabBarLabel: 'Favorites', // Sekme başlığı
        tabBarIcon: ({ focused }) => (
          <CustonTabBarIcon name={'heart'} focused={focused} />
        ),
      }}
      />
    </Tab.Navigator>
  
  );
};

export default AppNavigator;
