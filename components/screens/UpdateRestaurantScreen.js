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
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import globalUserModel from "../Model";
import * as ImagePicker from "expo-image-picker";
import { Button, Input } from "react-native-elements";
import { auth, db } from "../../database/firebase";

const image = require("../../assets/restaurant/register.jpg");

export default function UpdateRestaurantScreen({ route, navigation }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      globalUserModel.setPhoto(result.uri);
    }
  };

  const updateResto = () => {
    //const { uid, displayName, email, password } = this.props.navigation;
    // const { navigate } = this.props.navigation;
    try {
      const uid = auth?.currentUser?.uid;
      const photo = auth?.currentUser?.photoURL;
      console.log(photo);
      return db
        .collection("admin")
        .doc(uid)
        .update({
          uid: uid,
          displayName: globalUserModel.userName,
          email: globalUserModel.email,
          password: globalUserModel.password,
          photoURL: globalUserModel.photo
            ? globalUserModel.photo
            : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffindicons.com%2Fsearch%2Favatar&psig=AOvVaw1sEiZj4FJSN9RhgnlAWSrl&ust=1632779417317000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKDOlcbPnfMCFQAAAAAdAAAAABAD",
          location: globalUserModel.location,
          description: globalUserModel.description,
        })
        .then((snapShot) => navigation.navigate("AdminHome"))
        .catch((error) => {
          const errorMessage = error.message;
          alert("Couldn't update restaurant Details");
        });

      // ...
    } catch (error) {
      const errorMessage = error.message;
      alert("Failed to update restaurant details, check your network");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderRadius: 20,
          marginVertical: 40,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(196, 196, 196, 0.9)",
        }}
      >
        <KeyboardAvoidingView>
          <View>
            <TouchableOpacity
              onPress={() => {
                try {
                  navigation.navigate("AdminRegister", {
                    uid: auth?.currentUser?.uid,
                    displayName: globalUserModel.userName,
                    email: globalUserModel.email,
                    password: globalUserModel.password,
                  });
                } catch (error) {
                  const errorMessage = error.message;
                  alert(errorMessage);
                }
              }}
            >
              <AntDesign
                name="closecircle"
                size={24}
                color="white"
                style={{ padding: 24 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <TouchableOpacity
            /*  onPress={() => {
try {
                    this.pickImage();
                  } catch (error) {
                    const errorMessage = error.message;
                    alert("could pick image");
                  }
                }
            }*/
            >
              <Image
                source={{ uri: globalUserModel.photo }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 60,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <FontAwesome
                name="user-circle-o"
                size={24}
                color="white"
                style={{ marginHorizontal: -20, marginTop: 105 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "75%",
              left: 15,
              marginVertical: 10,
            }}
          >
            <Input
              placeholder="Restaurant Name"
              value={globalUserModel.userName}
              onChangeText={(userName) => globalUserModel.setName(userName)}
              style={{ color: "#FFFFFF" }}
            />
            <Input
              placeholder="email@admin.com"
              onChangeText={(email) => globalUserModel.setEmail(email)}
              style={{ color: "#FFFFFF" }}
              value={globalUserModel.email}
            />
            <Input
              placeholder="Restaurant Number"
              multiline
              placeholder="Phone no: (+27) 0"
              style={{ color: "#FFFFFF" }}
              keyboardType="phone-pad"
              onChangeText={(mobile) => globalUserModel.setMobile(mobile)}
              value={globalUserModel.mobile}
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
            <TouchableOpacity
              style={{
                height: 40,
                width: 200,
                borderRadius: 20,
                backgroundColor: "white",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginVertical: 10,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Upload menu as Pdf
              </Text>
            </TouchableOpacity>
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
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
