import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Movie = {
    id: string;
    Email: string;
    Firstname: string;
    Lastname: string;
    PartOf: string;
    Zones: string
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
<View style={{flex: 1, padding: 24}}>
<Text>{savedData}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <><Text style={{ fontSize: 22 }}>Hi {item.Firstname}, There are no alarms</Text>
             
                  </>
          )}
        />
      )}
    </View>
);
};
export default MyComponent;