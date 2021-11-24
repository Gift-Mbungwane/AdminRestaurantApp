import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import globalUserModel from "../Model";
import { auth, db, realtimedb } from "../../database/firebase";

const image = require("../../assets/restaurant/register.jpg");

export default class AdminRegister extends Component {
  state = {
    uploading: false,
  };

  constructor(props) {
    super(props);
  }
  Register() {
    this.setState({ uploading: true });
    const { navigate } = this.props.navigation;
    auth
      .createUserWithEmailAndPassword(
        globalUserModel.email,
        globalUserModel.password
      )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        // Add a new document in collection "users"
        // ...
        this.setState({ uploading: false });
        alert("Your account has been registered");
        navigate("Restaurantdetails", {
          displayName: globalUserModel.userName,
          email: globalUserModel.email,
          password: globalUserModel.password,
        });

        //
      })
      .catch((error) => {
        const errorMessage = error.message;
        // alert(errorMessage);
        this.setState({ uploading: false });

        alert("This account is registered, please sign in");
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "90%",
            borderRadius: 20,
            marginVertical: "20%",
            backgroundColor: "#53A1CD",
          }}
          transparant={true}
        >
          <TouchableOpacity onPress={() => navigate("Main")}>
            <AntDesign
              name="closecircle"
              size={24}
              color="#FFFFFF"
              style={{ padding: 24 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "#FFFFFF",
              marginHorizontal: 25,
            }}
          >
            Sign Up as Admin Restuarant
          </Text>
          <KeyboardAvoidingView>
            <View
              style={{
                width: "70%",
                marginVertical: 40,
                left: 15,
                color: "white",
              }}
            >
              <Input
                placeholder="Restaurant name"
                value={globalUserModel.userName}
                onChangeText={(userName) => globalUserModel.setName(userName)}
                style={{ color: "#FFFFFF" }}
              />
              <Input
                placeholder="Restaurant@admin.com"
                value={globalUserModel.email}
                onChangeText={(email) => globalUserModel.setEmail(email)}
                style={{ color: "#FFFFFF" }}
              />
              <Input
                placeholder="password"
                value={globalUserModel.password}
                onChangeText={(password) =>
                  globalUserModel.setPassword(password)
                }
                style={{ color: "#FFFFFF" }}
                secureTextEntry={true}
              />
            </View>
          </KeyboardAvoidingView>
          {this.state.uploading && (
            <ActivityIndicator
              size="large"
              style={{ alignSelf: "center" }}
              color="white"
            />
          )}
          <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                color: "#FFFFFF",
              }}
            >
              Sign up
            </Text>
            <TouchableOpacity
              onPress={() => {
                try {
                  this.Register();
                } catch (error) {
                  const erro = error.message;
                  alert("please check your email and password");
                }
              }}
              style={{
                borderRadius: 40,
                backgroundColor: "#FFFFFF",
                marginHorizontal: "54%",
                height: 50,
                width: 50,
              }}
            >
              <Ionicons
                name="ios-chevron-back"
                size={34}
                color="black"
                style={{
                  alignSelf: "center",
                  marginVertical: 7,
                  transform: [{ rotateY: "180deg" }],
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 25,
              marginVertical: 40,
            }}
          >
            <TouchableOpacity onPress={() => navigate("AdminLogIn")}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#FFFFFF",
                  textDecorationLine: "underline",
                }}
              >
                Signin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
