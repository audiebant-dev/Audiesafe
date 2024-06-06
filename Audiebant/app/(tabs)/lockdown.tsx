import {
    Image,
    StyleSheet,
    Button,
    View,
    TextInput,
    Text,
    Alert,
    TouchableOpacity,
  } from "react-native";
  

  import React, { useEffect, useState } from "react";
  import { Link, router } from "expo-router";
  import { Controller, useForm } from "react-hook-form";
  import AsyncStorage from '@react-native-async-storage/async-storage';

   

export default function HomeScreen() {


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

    const { control, handleSubmit } = useForm({
        defaultValues: {
        },
      });

 
      const onSubmit = (data) => {
        console.log(data);
        fetch(`https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_lockdown_api.php?email=${savedData}`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: savedData,
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response.status === "success") {
             // Alert.alert("API called successfully", savedData);
    
             
            
           router.replace('/home');
            } else {
              Alert.alert("There was an error");
              router.replace('/home');
            }
          })
          .catch((error) => console.error(error));
      };
    



  return (
 
 <><View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#FF4141",
          width: "100%",
          height: "100%",
          padding: 0
      }}>
          <Image
              source={require("@/assets/images/audiesafe_white.png")}
              resizeMode="contain"
              style={{
                  width: "80%", marginTop: -20
              }} />
      
      
      <View><Text style={{color: "white", marginTop: 10, fontSize: 32, textAlign: "center", padding: 18}}>There is currently a
lockdown scenario,
Please evacuate the
building</Text></View>


<TouchableOpacity  onPress={handleSubmit(onSubmit)}  style={styles.button}>
<Text style={{ color: '#fff', textAlign: "center", fontWeight: 500, fontSize: 16 }}>Confirm and Close</Text>
</TouchableOpacity>

</View></>


  );
}



const styles = StyleSheet.create({

    button: {
        backgroundColor: '#017ac3', 
        padding: 15, 
        borderRadius: 15, 
        marginTop: 200,
        width: "80%"
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

