import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustonIcon from '../tabBarIcons/CustonTabBarIcon';
import { Phone,Laptop, Perfume, Skincare } from '../assets';
const Discover = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loader,setLoader] = useState(true)
  const [search, setSearch] = useState("")
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
   fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=14');
      if (response.ok) {
        const result = await response.json();
        const products = result.products;
        setData(products);
        if(search) setSearch('')
        setLoader(false)
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };
  const fetchSearchData = async (search) => {
   
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        if (response.ok) {
          const result = await response.json();
          const products = result.products;
          const filterSearch = products?.filter(item =>
            (item?.category?.toLowerCase() === search?.toLowerCase() || 
            item?.title?.toLowerCase() === search?.toLowerCase()) || false
          );
          
          setData(filterSearch);
          setLoader(false);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    
  };
  
  


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("detail", {id: item.id})} className="w-1/2 md:w-full p-2">
      <View style={{ backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 }}>
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
    <SafeAreaView className="bg-[#f3f1f1e1]" style={{ flex: 1, position: 'relative' }}>
        <StatusBar  style='dark'/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <View className="pr-0">
          <Text style={{ fontSize: 40, color: '#0DA54B', fontWeight: 'bold' }}>Explore </Text>
   
        </View>
        <View style={{marginTop:'-32px'}}>
          <CustonIcon  color="red" name={"shopping-bag"}/>
        </View>
     </View>

      {/*Searchbar */}
     <View className="mt-2 flex-row self-center justify-center bg-[#fff] rounded-xl w-[92%]  p-1">
            <TextInput
              onChangeText={(text) => setSearch(text)}
              value={search}
              placeholder='Search category...'
              className="flex-1 h-[30px] px-[8px]"
            />
      <TouchableOpacity onPress={fetchData} className="p-1 flex-row gap-[-20px] justify-between ">
        <CustonIcon size={28} style={{ marginLeft: 12 }} name={"close"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => fetchSearchData(search)} className="p-1 flex-row gap-[-20px] justify-between ">
        <CustonIcon size={28} name={"search"} />
      </TouchableOpacity>
          </View>


          <View className="flex-row justify-between items-center mx-4 my-3">
            <Text className="text-[22px] font-bold">Shope by Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Products")}>
            <Text className="text-[#0DA54B]">View all</Text>
            </TouchableOpacity>
          </View>
          

          {/*Categorys */}
            <View className="flex-row gap-3 justify-between mx-4">
            <TouchableOpacity onPress={() => fetchSearchData('smartphones')} >
              <View className="border-[1px] w-[75px] h-[65px] bg-white items-center border-[#7AF97A] p-2 rounded-[10px]">
              <Image source={Phone} className="w-[30px] h-[30px]" />
              <Text className="text-[14px]">Phone</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => fetchSearchData('laptops')} >
              <View className="border-[1px] w-[75px] h-[65px] bg-white items-center border-[#7AF97A] p-2 rounded-[10px]">
              <Image source={Laptop} className="w-[30px] h-[30px]" />
              <Text>Laptop</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => fetchSearchData('fragrances')} >
              <View className="border-[1px] w-[75px] h-[65px] bg-white items-center border-[#7AF97A] p-2 rounded-[10px]">
              <Image source={Perfume} className="w-[30px] h-[30px]" />
              <Text>Perfume</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => fetchSearchData('skincare')} >
              <View className="border-[1px] w-[75px] h-[65px] bg-white items-center border-[#7AF97A] p-2 rounded-[10px]">
              <Image source={Skincare} className="w-[30px] h-[30px]" />
              <Text>Skincare</Text>
              </View>
            </TouchableOpacity>

            </View>

        {
            loader ? <Loader/> :
            <FlatList
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

export default Discover;
