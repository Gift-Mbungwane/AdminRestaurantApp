import { Ionicons } from "@expo/vector-icons";
import React, { Component, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import globalUserModel from "../Model";
import * as ImagePicker from "expo-image-picker";
import { Button, Input } from "react-native-elements";
import { auth, db } from "../../database/firebase";

const image = require("../../assets/restaurant/register.jpg");

export default function UpdateRestaurantScreen({ route, navigation }) {
  const [uploading, setUploading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const updateOption = () => {
    let uid = auth?.currentUser?.email;
    if (uid != null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      navigation.navigate("AdminHome", { uid: uid });
      // alert("account is still signed in");

      // ...
    } else {
      navigation.navigate("AdminLogIn");

      // User is signed out
      // used this if else method on signing out funtionality
    }
  };

  const updateResto = () => {
    //const { uid, displayName, email, password } = this.props.navigation;
    // const { navigate } = this.props.navigation;
    try {
      const uid = auth?.currentUser?.uid;

      setSubmit(true);
      // const photo = auth?.currentUser?.photoURL;
      //console.log(photo);
      return db
        .collection("admin")
        .doc(uid)
        .update({
          uid: uid,
          location: globalUserModel.location,
          description: globalUserModel.description,
          serviceOption: globalUserModel.serviceOption,
        })
        .then((snapShot) => {
          navigation.navigate("AdminHome", { uid: uid });
          setSubmit(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setSubmit(false);

          alert("Couldn't update restaurant Details");
        });

      // ...
    } catch (error) {
      const errorMessage = error.message;
      setSubmit(false);
      alert("Failed to update restaurant details, check your network");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderRadius: 20,
          marginVertical: 80,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(196, 196, 196, 0.9)",
        }}
      >
        <KeyboardAvoidingView>
          <View>
            <TouchableOpacity onPress={updateOption}>
              <AntDesign
                name="closecircle"
                size={24}
                color="white"
                style={{ padding: 24 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "75%",
              left: 15,
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <TextInput
              multiline
              placeholder="serviceOptions: No-contact delivery/Takeaway/Dine-in "
              style={{
                borderRadius: 6,
                backgroundColor: "white",
                height: 35,
                color: "black",
                width: 300,
                alignSelf: "center",
                right: 16,
              }}
              onChangeText={(service) =>
                globalUserModel.setServiceOption(service)
              }
              value={globalUserModel.description}
            />
            <TextInput
              multiline
              placeholder="location"
              style={{
                borderRadius: 6,
                backgroundColor: "white",
                height: 35,
                color: "black",
                width: 250,
                marginVertical: 10,
              }}
              onChangeText={(location) => globalUserModel.setLocation(location)}
              value={globalUserModel.description}
            />
            <TextInput
              multiline
              placeholder="Description"
              style={{
                borderRadius: 6,
                backgroundColor: "white",
                height: 35,
                color: "black",
                width: 250,
                height: 100,
                marginVertical: 10,
              }}
              onChangeText={(description) =>
                globalUserModel.setDecription(description)
              }
              value={globalUserModel.description}
            />
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              alignSelf: "center",
              borderRadius: 20,
              backgroundColor: "white",
              marginVertical: 10,
            }}
            onPress={updateResto}
          >
            {!submit ? (
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginVertical: 10,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Update
              </Text>
            ) : (
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                color="black"
              />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
