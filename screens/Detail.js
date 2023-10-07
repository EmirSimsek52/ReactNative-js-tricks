import { View, Text,StyleSheet ,Image, TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import { ThemeProvider, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/Loader';
import CustonIcon from '../tabBarIcons/IconNormal';
import { useFavorites } from '../context/FavContext';
const Detail = () => {
  const { addToFavorites,removeFromFavorites,chechkFav,favCheck} = useFavorites();
    const navigation = useNavigation()
    const route = useRoute()
    const {id} = route.params 
    console.log(id)
    console.log("data",favCheck)
    const [data, setData] = React.useState()
    const [catoData, setCatoData] = React.useState([])
    const [loader, setLoader] = React.useState(true)
    const fetchData = async () => {
        if(id){
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (response.ok) {
                  const result = await response.json();
                  console.log(result.category)
                  setData(result);
                  fetchCatogryData(result.category,result.id)
                  setLoader(false)
                } else {
                  console.error('Request failed with status:', response.status);
                }
              } catch (error) {
                console.error('An error occurred while fetching data:', error);
              }
        }
      };
      const fetchCatogryData = async (category,id) => { 
        try {
          const response = await fetch('https://dummyjson.com/products');
          if (response.ok) {
            const result = await response.json();
            const products = result.products;
            const filterCategory = products.filter(item => item.category === category && item.id !== id);
            setCatoData(filterCategory);
            setLoader(false);
          } else {
            console.error('Request failed with status:', response.status);
          }
        } catch (e) {
          console.error('An error occurred while fetching data:', e);
        }
      }
      React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
          });
          fetchData();
      },  [id]);
      React.useLayoutEffect(() => {
        chechkFav(data)
      },[favCheck])

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
       
            <View>
              {loader ? (
                <Loader />
              ) : (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('navigator')}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                  <Image source={{ uri: data?.thumbnail }} style={styles.image} />
                  <View style={styles.infoContainer}>
                    <Text style={styles.title}>{data?.title}</Text>
                    <Text style={styles.description}>{data?.description}</Text>
                    <Text style={styles.stock}>Stock: {data?.stock}</Text>
                    <Text style={styles.rating}>Rating: {data?.rating}</Text>
                    <Text style={styles.price}>Price: ${data?.price}</Text>
                    <Text style={styles.discount}>Discount: {data?.discountPercentage}%</Text>
                    
                  </View>
                </View>
              )}
            </View>
                
            <TouchableOpacity onPress={() => {
              if (favCheck) {
                addToFavorites(data);

              } else {
                removeFromFavorites(data);
              }
            }}>
              {favCheck ? (
                  <CustonIcon name="heart" size={40} color="#0DA54B" />
              ) : (
                <CustonIcon name="trash" size={40} />

              )}
            </TouchableOpacity>

            <Text style={{textAlign:'center',marginTop:0}}>Check Others</Text>
            <FlatList
                data={catoData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Yatay kaydırma için bu değeri 1 olarak ayarlayın
                // Bu prop yatay kaydırmayı etkinleştirir
                contentContainerStyle={{ padding: 2 }}
            />

        </SafeAreaView>
      );
      
}

export default Detail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F1F6F9',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 8,
    },
    infoContainer: {
      marginTop: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      marginTop: 8,
      color: '#777',
    },
    stock: {
      fontSize: 16,
      marginTop: 8,
    },
    rating: {
      fontSize: 16,
      marginTop: 8,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 16,
    },
    discount: {
      fontSize: 16,
      marginTop: 8,
    },
  });