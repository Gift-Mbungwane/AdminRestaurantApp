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
import { auth, db, storageRef } from "../../database/firebase";

const image = require("../../assets/restaurant/register.jpg");

export default function Restaurantdetails({ route, navigation }) {
  const [uploading, setUploading] = useState(false);
  const [submit, setSubmit] = useState(false);

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
      setSubmit(true);
      globalUserModel.setPhoto(result.uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed!"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = storageRef.child(new Date().toISOString());
      const snapshot = (await ref.put(blob)).ref
        .getDownloadURL()
        .then((imageUrl) => {
          globalUserModel.setPhoto(imageUrl);
          console.log(
            imageUrl,
            "this is setting the image too storage before 3"
          );

          blob.close();
          setSubmit(false);
        });

      // snapshot.snapshot.ref.getDownloadURL().then((imageUrl) => {
      //   console.log(imageUrl, "this is setting the image too storage before 2");
      //   setPhoto(imageUrl);
      // });
    }
  };

  //   const updateOption = () => {
  //     let uid = auth?.currentUser?.email;
  //     if (uid != null) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User

  //       navigation.navigate("UserScreen", { uid: uid });
  //       // alert("account is still signed in");

  //       // ...
  //     } else {
  //       navigation.navigate("AdminLogIn");

  //       // User is signed out
  //       // used this if else method on signing out funtionality
  //     }
  //   };

  const updateResto = () => {
    const { displayName, email, password } = this.props.navigation;
    // const { navigate } = this.props.navigation;
    try {
      const uid = auth?.currentUser?.uid;

      setSubmit(true);
      //const photo = auth?.currentUser?.photoURL;
      // console.log(photo);
      return db
        .collection("admin")
        .doc(uid)
        .update({
          uid: uid,
          photoURL: globalUserModel.photo
            ? globalUserModel.photo
            : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffindicons.com%2Fsearch%2Favatar&psig=AOvVaw1sEiZj4FJSN9RhgnlAWSrl&ust=1632779417317000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKDOlcbPnfMCFQAAAAAdAAAAABAD",
          location: globalUserModel.location,
          description: globalUserModel.description,
          serviceOption: globalUserModel.serviceOption,
          displayName: displayName,
          email: email,
          password: password,
        })
        .then((snapShot) => {
          setSubmit(false);

          navigation.navigate("UserScreen");
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
          marginVertical: 50,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(196, 196, 196, 0.9)",
        }}
      >
        <KeyboardAvoidingView>
          {/* {  <View>
            <TouchableOpacity onPress={updateOption}>
              <AntDesign
                name="closecircle"
                size={24}
                color="white"
                style={{ padding: 24 }}
              />
            </TouchableOpacity>
          </View>} */}
          <View style={{ alignSelf: "center", flexDirection: "row", top: 20 }}>
            <Image
              source={{ uri: globalUserModel.photo }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 60,
                backgroundColor: "white",
              }}
            />
            <TouchableOpacity onPress={pickImage}>
              <FontAwesome
                name="user-circle-o"
                size={24}
                color="grey"
                style={{ marginHorizontal: -20, marginTop: 105 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "75%",
              left: 15,
              marginVertical: 20,
              top: 10,
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
                size="large"
                color="black"
                style={{ alignSelf: "center" }}
              />
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
