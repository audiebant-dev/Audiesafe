import {
  Image,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import { Input, CheckBox } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

export default function HomeScreen() {
 
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    fetch("https://gibgab.com/audiesafe_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          Alert.alert("Successful", JSON.stringify(data));
          console.log("Form data sent successfully");
          return response.json();
        } else {
          Alert.alert("error", JSON.stringify(data));
          console.error("Failed to send form data");
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

         <View style={{marginTop: 225}}>
      <Text style={{ fontSize: 22 }}>Forget password?</Text>
      <Text style={{ fontSize: 16, color: "grey" }}>
        Enter your email address below to recieved your password reset instructions
      </Text>
</View>

      
      <View style={{marginTop: 20}}>
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

    






      <TouchableOpacity    onPress={handleSubmit(onSubmit)} style={{ backgroundColor: '#017ac3', padding: 15, borderRadius: 15, marginTop: 25 }}>
  <Text style={{ color: '#fff', textAlign: "center", fontWeight: 500, fontSize: 16 }}>Send</Text>
</TouchableOpacity>



   
   
  
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    height: 200,
    width: 400,
    top: 13,
    position: "absolute",
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
});
