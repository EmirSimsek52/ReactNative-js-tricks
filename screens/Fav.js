import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavContext';
const Fav = () => {
    const { favorites } = useFavorites();
    const navigation = useNavigation()
    console.log(favorites)
    React.useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      
      }, []);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Favoriler</Text>
      {
        favorites ?       
        <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      :
      <Text className="text-primary">Henüz Favori ürününüz yok</Text>
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0DA54B'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
  },
});

export default Fav;
