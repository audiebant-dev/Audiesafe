import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";


import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import 'react-native-gesture-handler';


type Movie = {
  id: string;
  Email: string;
  Firstname: string;
  Lastname: string;
  PartOf: string;
  Zones: string
};
   

export default function HomeScreen() {

 

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

    

      const [isModalVisible, setModalVisible] = useState(false);
    
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

      const [IsReady, SetIsReady] = useState(false);
      const [savedData, setSavedData] = useState('')
      useEffect(()=> {
        const _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("email");
          if (value !== null) {
            setSavedData(value)
          }
        } catch (error) {
          console.log('error2', error)
        }
        }
        _retrieveData();
      },[])
    
        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState<Movie[]>([]);
      
        const getMovies = async () => {
          try {
            const response = await fetch(`https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_user_api.php?email=${savedData}`);
            const json = await response.json();
            setData(json.movies);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => { 
          getMovies();
        }, []); 
    


  return (
    <>
    
    <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>


 <View style={{
      justifyContent: 'center',
      alignItems: 'center', borderBottomColor: "#017ac3", borderBottomWidth: 1,
      marginTop: 10,
      padding: 10,
      width: "100%"
    }}>
      <Image
        source={require("@/assets/images/Audiebant_Logo-blue.png")}
        resizeMode="contain"
        style={{
          width: 200, height: 40, marginTop: 400
          , marginBottom: 10
        }} />
    </View><View
      style={{
        position: "absolute",
        top: 0,
        height: 110,
        width: "100%",
      }}
    >
 <Link href="/notifications" style={styles.link}>
<MaterialCommunityIcons
            name={"cog"}
            size={35}
            color="black"
            style={styles.icon}  />
        </Link>

        <Link href="/notifications" style={styles.link2}>
          <MaterialCommunityIcons
            name={"bell-ring-outline"}
            size={35}
            color="black"
            style={styles.icon2} />
        </Link>
      </View>
      
      

      
      <View style={{ marginTop: 150 }}>

<Link href="/lockdown" style={{display: "none"}}><Text>lockdown screen</Text></Link>


      </View><View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <MaterialCommunityIcons
          name={"bell-off-outline"}
          size={150}
          color="#017ac3" />

        
      
        <View style={{ marginTop: 10 }}>
        <View style={{flex: 1, padding: 24}}>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <><Text style={{ fontSize: 22 }}>Hi {item.Firstname}, you have no alerts</Text>
             
                  </>
          )}
        />
      )}
    </View>


</View>
      </View>
      </ScrollView>
  </SafeAreaView>
      </>
  );
}
const styles = StyleSheet.create({
  reactLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: "100%",
    top: 70,
    left: 120,
    position: "absolute",
    zIndex: 100
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: 50,
      },
  icon2: {
position: "absolute",
top: 50,
  },
link2: {
color: "#0000",
right: 15,
position: "absolute",
top: 75,
  },
  link: {
    color: "#0000",
    left: 15,
    position: "absolute",
    top: 75
      }
});