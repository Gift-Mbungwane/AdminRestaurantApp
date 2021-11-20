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
  FlatList,
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
  const [isVisible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [menu, setMenu] = useState("");
  const [datasnap, setDatasnap] = useState(null);

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
    getData();
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
      setImage(result.uri);
    }
  };

  const getData = () => {
    const { uid } = route.params;
    return db
      .collection("menu")
      .where("uid", "==", uid)
      .onSnapshot((querySnap) => {
        const data = querySnap.docs.map((documentSnap) => documentSnap.data());
        // console.log(data);
        setDatasnap(data);
      });
  };

  const uploadData = () => {
    return db
      .collection("menu")
      .add({
        photoURL: image,
        menu: menu,
        uid: auth?.currentUser?.uid,
      })
      .then((dataSnapshot) => {
        dataSnapshot.update({ key: dataSnapshot.id });
        alert(`${menu} has been added`);
      })
      .catch((error) => {
        alert(
          "please provide both the description of the menu and a picture of the actual menu"
        );
      });
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminHome")}
          style={{ alignSelf: "flex-start", right: 100, top: 7 }}
        >
          <Ionicons name="ios-chevron-back" size={34} color="#53A1CD" />
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 34 }}>
          Menu
        </Text>
      </View>

      <View style={{ height: "90%" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={datasnap}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View item={item} style={globalStyles.flatlistContainer}>
                <Image
                  source={{ uri: item.photoURL }}
                  style={globalStyles.image}
                />
                <View>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      fontSize: 25,
                      marginHorizontal: 25,
                      marginVertical: 50,
                    }}
                  >
                    {item.menu}
                  </Text>
                </View>
              </View>
            );
          }}
        />
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
                height: "50%",
                width: "80%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#fff",
                marginTop: 80,
                marginLeft: 40,
              }}
            >
              <View style={{ alignSelf: "flex-start", marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      setVisible(!isVisible);
                    } catch (error) {
                      const errorMessage = error.message;
                      alert(errorMessage);
                    }
                  }}
                  style={{ marginBottom: 60, left: 10 }}
                >
                  <AntDesign name="closecircle" size={24} color="grey" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  bottom: 60,
                }}
              >
                <Image
                  source={{ uri: image }}
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
              <View>
                <TouchableOpacity
                  style={{
                    textDecorationLine: "underline",
                    marginTop: -50,
                    backgroundColor: "grey",
                    borderRadius: 60,
                    height: 40,
                    width: 150,
                  }}
                >
                  <TextInput
                    placeholder="Menu decription"
                    onChangeText={(menu) => setMenu(menu)}
                    style={{ color: "white" }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={globalStyles.changeStatusText}
                  onPress={uploadData}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginVertical: 10,
                      color: "black",
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
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginHorizontal: "-5%",
            position: "absolute",
            marginVertical: 50,
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
  );
}
