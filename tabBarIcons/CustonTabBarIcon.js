import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const CustonTabBarIcon = ({name,focused}) => {
  return (
   <Icon 
    name={name}
    size={28}
    color={focused ? "#0DA54B" : 'gray'}
   /> 
  )
}

export default CustonTabBarIcon