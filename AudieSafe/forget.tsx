import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Alert, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
export default function App() {


    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

  const [isChecked, setChecked] = useState(false);

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
    <><View style={styles.container}>
      <Image
        source={require("./assets/audiesafe.png")}
        resizeMode="contain"
        style={styles.reactLogo} />
</View>

<View style={{marginTop: 200, marginLeft: 40}}>
<Text
        style={{
          fontSize: 17,
          color: "grey",
          marginTop: 35,
          marginBottom: -5,
        }}
      >
        Email address
      </Text>
</View>
      <View style={styles.container}>
        <Controller
          control={control}
          name={"email"}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder=""
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <MaterialCommunityIcons
          name={"account-outline"}
          size={30}
          color="#017ac3"
          style={styles.icon2}
        />
      </View>

      

      <View style={styles.container}>
        <View style={styles.section}>
        <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#017ac3" : undefined}
          />
          <Text style={styles.paragraph}>Remember me</Text>
        </View>
      </View>

      <View style={{ alignContent: "center", marginTop: 45, width: 300 }}>
        <Button
          color="#017ac3" //button color
          title="Continue"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.button}>
        <Text style={styles.text}>Continue</Text>
      </LinearGradient>

      <View>
        <Text
          style={{
            fontSize: 17,
            color: "grey",
            marginTop: 0,
            textAlign: "center",
          }}
        >
          Or
        </Text>
       

      </View>
      <View
        style={{
          borderColor: "#017AC3",
          borderWidth: 1,
          borderRadius: 20,
          width: 120,
          height: 120,
          marginLeft: "33%",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            color: "grey",
            marginTop: 0,
            textAlign: "center",
          }}
        >
          Scan QR
        </Text>

        <View style={styles.section}>
          <Link href="/forget" style={styles.link}>
            Forgot password?
          </Link>
        </View>


        <Link href="/qr" style={styles.link}>
            link to qr
       
        <MaterialCommunityIcons
          name={"qrcode-scan"}
          size={60}
          color="#017ac3"
          style={styles.icon3}
        />   </Link>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "left",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
  },


  titleContainer: {
    flexDirection: "row",
    textAlign: "center",
    gap: 8,
    backgroundColor: "#fff",
    color: "black",
  },
  reactLogo: {
    justifyContent: "center",
    alignItems: "center",
    height: 74,
    width: 313,
    top: 90,
    left: 45,
    position: "absolute",
  },


  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },


  styleLoginBtnLarge: {
    width: "100%",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 45,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#017ac3", //button background/border color
    overflow: "hidden",
    marginBottom: 10,
  },


  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    borderBottomColor: "#017ac3",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 40,

    marginLeft: -15,
  },

  icon3: {
    marginTop: 10,
    marginLeft: 30,
    color: "#017ac3",
  },

  icon: {
    marginLeft: 10,
    color: "#017ac3",
    marginBottom: 5,
  },
  icon2: {
    left: 15,
    position: "absolute",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    marginLeft: -15,
    borderColor: "#C7E5FB",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 4,
  },
  link: {
    marginTop: 1,
    paddingVertical: 15,
    marginLeft: 80,
    fontSize: 16,
  },

  
});