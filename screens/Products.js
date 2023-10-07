import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
const Products = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loader,setLoader] = useState(true)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (response.ok) {
        const result = await response.json();
        const products = result.products;
        setData(products);
        setLoader(false)
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("detail", {id: item.id})} className="w-1/2 md:w-full p-2">
      <View style={{ backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 }}>
        <Image source={{ uri: item?.thumbnail }} style={{ width: '100%', height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
        <View style={{ padding: 12 }}>
          <Text className="text-xl" numberOfLines={1}>{item.title}</Text>
          <Text className="text-l">Price: ${item.price}</Text>
          <Text className="text-l text-primary">Rating: {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F6F9', position: 'relative' }}>
        <StatusBar  style='dark'/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <View className="pr-0">
          <Text style={{ fontSize: 40, color: '#00BCC9', fontWeight: 'bold' }}>All Products</Text>
        </View>
        <Image source={{uri: ''}} />
      </View>
        {
            loader ? <Loader/> :
           
            <FlatList
            style={{marginBottom: '-40'}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 8 }}
          />
        }
    </SafeAreaView>
  );
};

export default Products;
