import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import moment from "moment";
import { ListItem } from "react-native-elements/dist/list/ListItem";

const image = require("../../assets/restaurant/register.jpg");

export default class ViewBooking extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { address, guest, phone, timeIn, timeOut, date, createdAt } =
      this.props.route.params;
    return (
      <View style={globalStyles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigate("AdminHome")}>
            <Ionicons name="ios-chevron-back" size={34} color="#53A1CD" />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={image}
            style={{
              width: 150,
              height: 150,
              borderRadius: 120,
              marginVertical: 10,
              backgroundColor: "white",
              alignSelf: "center",
            }}
          />
        </View>
        <TouchableOpacity style={{ marginVertical: 12, alignSelf: "flex-end" }}>
          <SimpleLineIcons name="plus" size={34} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <MaterialCommunityIcons name="email" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{address}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <FontAwesome5 name="users" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{guest}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <FontAwesome name="phone-square" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{phone}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <Ionicons name="ios-time" size={24} color="#53A1CD" />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, marginHorizontal: 5 }}> {timeIn}</Text>
            <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
              {timeOut}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <MaterialIcons name="date-range" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
            {new Date(date.toDate()).toDateString()}{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <Fontisto name="date" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
            {new Date(createdAt.toDate()).toDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#53A1CD",
            marginVertical: 15,
            position: "relative",
            marginVertical: 10,
            height: 40,
            width: 100,
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
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
    );
  }
}
