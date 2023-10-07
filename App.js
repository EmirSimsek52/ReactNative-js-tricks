import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Discover from './screens/Discover';
import Detail from './screens/Detail';
import Products from './screens/Products';
import AppNavigator from './screens/AppNavigator';
import { FavoritesProvider } from './context/FavContext';
export default function App() {

  const Stack = createNativeStackNavigator();  
  return (
    <NavigationContainer>
      <FavoritesProvider>
         <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name='navigator' component={AppNavigator} />
              <Stack.Screen name='detail' component={Detail} />
      </Stack.Navigator>
      </FavoritesProvider>
    </NavigationContainer>
  );
}


/*
   

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind'; // varsayılanı "react-native" ile değiştirin
import React, { useState, useEffect } from 'react'; // React ekleyin

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme(); // "ColorScheme" yerine "colorScheme" kullanın

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    toggleColorScheme(isDarkMode ? "light" : "dark");
  };

  return (
    <View className="flex-1 items-center justify-center dark:bg-slate-800">
      <Switch value={isDarkMode} onValueChange={toggleSwitch} />
      <Text className="dark:text-white">Hello BSV</Text>
      <StatusBar style="auto" />
    </View>
  );
}


 */