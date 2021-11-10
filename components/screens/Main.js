import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}
      >
        <MaterialIcons
          name="local-restaurant"
          size={150}
          color="black"
          style={{ alignSelf: "center", marginVertical: 130 }}
        />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={globalStyles.signInButton}
            onPress={() => navigate("AdminLogIn")}
          >
            <Text
              style={{
                fontSize: 23,
                color: "white",
                alignSelf: "center",
                marginVertical: 18,
                fontWeight: "bold",
              }}
            >
              Sign In as Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.signInButton}
            onPress={() => navigate("AdminRegister")}
          >
            <Text
              style={{
                fontSize: 23,
                color: "white",
                alignSelf: "center",
                marginVertical: 18,
                fontWeight: "bold",
              }}
            >
              Sign Up as Admin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
