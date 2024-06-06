import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Movie = {
    id: string;
    Date: string;
    msg: string;
    PartOf: string;
  };


const MyComponent = () => {

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
        const response = await fetch(`https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_notifications_api.php?email=${savedData}`);
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
<View style={{flex: 1, padding: 0}}>
<Text style={{  }}>{savedData}</Text>

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
            <Text style={{fontSize: 5}}>
                  {item.Date} {item.msg}
              </Text>
                
                  </>
          )}
        />
      )}
    </View>
);
};
export default MyComponent;