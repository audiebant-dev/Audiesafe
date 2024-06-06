import {
    Image,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
  } from "react-native";
  
  import ParallaxScrollView from "@/components/ParallaxScrollView";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ExisitigNotifications from '@/components/api_fetch_notifications_existings';
  import MyComponent from '@/components/api_fetch_notifications';
  import MultiSwitch from 'react-native-multiple-switch'
  
  type Movie = {
    id: string;
    Date: string;
    msg: string;
    PartOf: string;
  };

  type Movie_live = {
    id: string;
    Date: string;
    msg: string;
    PartOf: string;
  };

  
  export default function HomeScreen() {
const [visible, setVisible] = React.useState(false);
const [visible2, setVisible2] = React.useState(true);
const items = ['Live Notification', 'Existing Notification']
const [value, setValue] = useState(items[0])
const items2 = ['Live Notification', 'Existing Notification']
const [value2, setValue2] = useState(items2[1])
  
      
  
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
          const response = await fetch(`https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_exsiting_notifications_api.php?email=${savedData}`);
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


      const [isLoading_live, setLoading_live] = useState(true);
      const [data_live, setData_live] = useState<Movie_live[]>([]);
    
      const getMovies_live = async () => {
        try {
          const response = await fetch(`https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_notifications_api.php?email=${savedData}`);
          const json = await response.json();
          setData_live(json.movies);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading_live(false);
        }
      };
    
      useEffect(() => { 
        getMovies_live();
      }, []); 
  

 
  
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#fff", dark: "#fff" }}
      >
   <View style={{ justifyContent: 'center',
      alignItems: 'center',}}>

          
 </View>




 {visible2 && (
<MultiSwitch
  items={items}
  value={value}


  onChange={(val) =>  { setVisible(true); setVisible2(false);
   }}
  containerStyle={{
    backgroundColor: '#F2F8FC',
    height: 50
  }}
  sliderStyle={{
    backgroundColor: '#017ac3'
  }}
  textStyle={{
    color: 'black',
    fontSize: 16,
  }}
/>
  )}

{visible && (
<MultiSwitch
  items={items2}
  value={value2}


  onChange={(val) =>  { setVisible(false); setVisible2(true);  }}
  containerStyle={{
    backgroundColor: '#F2F8FC',
    height: 50
  }}
  sliderStyle={{
    backgroundColor: '#017ac3'
  }}
  textStyle={{
    color: 'black',
    fontSize: 16,
  }}
/>
  )}



  <View
          style={{
            position: "absolute",
            top: 0,
            height: 10,
            width: "100%",
  
  
          }}
        > 

        </View>
  

           <View style={{marginTop: -10}}>
         

{visible && (
    <View style={{flex: 1, padding: 0}}>


      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <>
            <View style={{  padding:20, borderWidth: 1, marginTop: 20, borderRadius: 15}}>
            <Image
            source={require("@/assets/images/shield_single.png")}
            resizeMode="contain"
            style={{ width: 200, height: 50, position: "absolute", left: -65, top: 15
          }}
          />

<Text style={{fontSize: 22, fontWeight: 500, marginLeft: 45}}>Alert!</Text>
                
                <Text style={{position: "absolute", right: 10, fontSize: 11, color: "grey", marginTop: 5}}>{item.PartOf} - {item.Date} 
              </Text>
              <Text style={{fontSize: 14,  marginLeft: 45}}>{item.msg}
                  </Text>
              </View>
            
            
                
                  </>
          )}
        />
      )}
    </View>
  )}


{visible2 && (
    <View style={{flex: 1, padding: 0}}>
      {isLoading_live ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data_live}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <>
            <View style={{  padding:20, borderWidth: 1, marginTop: 20, borderRadius: 15}}>
            <Image
            source={require("@/assets/images/shield_single.png")}
            resizeMode="contain"
            style={{ width: 200, height: 50, position: "absolute", left: -65, top: 15
          }}
          />
<Text style={{fontSize: 22, fontWeight: 500, marginLeft: 45}}>Alert!</Text>
<Text style={{position: "absolute", right: 10, fontSize: 11, color: "grey", marginTop: 5}}>{item.PartOf} - {item.Date} 
              </Text>
              <Text style={{fontSize: 14,  marginLeft: 45}}>{item.msg}
                  </Text>
              </View>
                  </>
          )}
        />
      )}
    </View>
  )}
  </View>
      </ParallaxScrollView>
    );
  }
  
  
  
  const styles = StyleSheet.create({
    button: {
        backgroundColor: '#017ac3', 
        padding: 15, 
        borderRadius: 15, 
        marginTop: 25
      },
    titleContainer: {
      flexDirection: "row",
      textAlign: "center",
      gap: 8,
      backgroundColor: "#fff",
      color: "black",
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
      backgroundColor: "#fff",
    },
    reactLogo: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 130,
      top: 70,
      left: 120,
      position: "absolute",
      zIndex: 100
    },
  
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
  
      paddingHorizontal: 14,
    },
    input: {
      flex: 1,
      color: "black",
      fontSize: 16,
      borderColor: "#017ac3",
      borderWidth: 1,
      borderRadius: 15,
      padding:15,
    },
  
    heading: {
      alignItems: "center",
      fontSize: 20,
      color: "green",
      marginBottom: 20,
    },
  
    icon2: {
  position: "absolute",
  top: 50,
    },
  
    link: {
  color: "#0000",
  right: -40,
  position: "absolute",
  top: 50
  
    }
  });
  
  