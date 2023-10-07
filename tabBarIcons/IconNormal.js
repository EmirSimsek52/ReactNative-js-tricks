import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const CustonIcon = ({name,color,size}) => {
  return (
   <Icon 
    name={name}
    size={size}
    color={color}
   /> 
  )
}

export default CustonIcon