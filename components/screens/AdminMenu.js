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
  Modal,
  Platform,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import globalUserModel from "../Model";
import * as ImagePicker from "expo-image-picker";
import { Button, Input } from "react-native-elements";
import { auth, db } from "../../database/firebase";
import { FloatingAction } from "react-native-floating-action";

const image = require("../../assets/restaurant/register.jpg");

const actions = [
  {
    text: "Add Menu",
    name: "Add Menu",
    position: 1,
  },
];

export default function AdminMenu({ route, navigation }) {
  const [isVisible, setVisible] = useState(true);
  const [image, setImage] = useState("");

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

  useEffect(() => {
    //pickImage();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 34 }}>
        Menu
      </Text>

      <View style={globalStyles.flatlistContainer}>
        <Image source={image} style={globalStyles.image} />
        <View>
          <Text
            style={{
              alignSelf: "flex-end",
              fontSize: 25,
              marginHorizontal: 25,
              marginVertical: 50,
            }}
          >
            Dessert
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: 20,
          }}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
              alert("Modal has now been closed.");
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00BCD4",
                height: 400,
                width: "80%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#fff",
                marginTop: 80,
                marginLeft: 40,
              }}
            >
              <View style={{ alignSelf: "flex-start", marginVertical: 40 }}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      setVisible(!isVisible);
                    } catch (error) {
                      const errorMessage = error.message;
                      alert(errorMessage);
                    }
                  }}
                >
                  <AntDesign
                    name="closecircle"
                    size={24}
                    color="black"
                    style={{ padding: 24 }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text> Reason for cancellation</Text>
                <TextInput
                  placeholder="reason for choosing status"
                  style={{
                    borderRadius: 12,
                    width: 200,
                    height: 60,
                    backgroundColor: "white",
                  }}
                />
                <TouchableOpacity style={globalStyles.changeStatusText}>
                  <Text
                    style={{
                      alignSelf: "center",
                      marginVertical: 10,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {/**end of Modal */}
        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginHorizontal: 35,
              marginVertical: 600,
            }}
          >
            <FloatingAction
              actions={[...actions]}
              onPressItem={(name) => {
                try {
                  if (name == "Add Menu") {
                    setVisible(true);
                  } else {
                    alert("exit without selection");
                  }
                } catch (error) {
                  alert("could not call the modal");
                }
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
