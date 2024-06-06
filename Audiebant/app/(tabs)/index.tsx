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

import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

 

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    fetch("https://audiesafe.audiebant.co.uk/audiesafe/audiesafe_api.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === "success") {
       //   Alert.alert("Logged in successfully", JSON.stringify(data));

          await AsyncStorage.setItem('email',JSON.stringify(data));
        
        router.replace('/home');
        } else {
          Alert.alert("User not found", JSON.stringify(data));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#fff" }}
    >

 <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
 <Image
          source={require("@/assets/images/shield.png")}
          resizeMode="contain"
          style={styles.reactLogo}
        />
         </View>
         
         
 <View style={{marginTop: 200}}>
      <Text style={styles.headingtext} >Log in to audiesafe</Text>
      </View>
      <View style={{marginTop: 70}}>
        <Controller
          control={control}
          name={"email"}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="Enter email address"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="lightgrey"
            />
          )}
        />
      </View>
<TouchableOpacity    onPress={handleSubmit(onSubmit)}  style={styles.button}>
<Text style={{ color: '#fff', textAlign: "center", fontWeight: 500, fontSize: 16 }}>Continue</Text>
</TouchableOpacity>

<View style={{marginTop: 10}}>
<Link href="/forget"  style={styles.link} >Forgot password?</Link>
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
  reactLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 400,
    top: 110,
    position: "absolute",
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
  link: {
    fontSize: 16,
    color: "#017ac3",
    marginTop: 3,
    marginBottom: -5,
    textAlign: "center"
  },
  headingtext: {
    fontSize: 16,
    color: "black",
    marginTop: 110,
    marginBottom: -5,
    textAlign: "center"
  },
});