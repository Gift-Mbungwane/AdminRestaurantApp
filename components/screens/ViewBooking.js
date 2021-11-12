import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
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
import FAB from "react-native-fab";
import { FloatingAction } from "react-native-floating-action";

const image = require("../../assets/restaurant/register.jpg");
const actions = [
  {
    text: "Pending",
    name: "Pending",
    position: 2,
  },

  {
    text: "Cancel",
    name: "Cancel",
    position: 3,
  },
  {
    text: "Approve",
    name: "Approve",
    position: 4,
  },
];

export default class ViewBooking extends Component {
  state = {
    isVisible: false,
    name: "",
  };
  constructor(props) {
    super(props);
  }

  displayModal(show, name) {
    this.setState({ isVisible: show, name: name });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { address, guest, phone, timeIn, timeOut, date, createdAt } =
      this.props.route.params;

    const action = ({ pending, aprove, cancel }) => {};

    return (
      <View style={globalStyles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert("Modal has now been closed.");
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00BCD4",
                height: 300,
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
                      this.displayModal(false);
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
                <Text> Write only reason for cancel</Text>
                <TextInput
                  placeholder="reason for choosing status"
                  style={{
                    borderRadius: 12,
                    width: 200,
                    height: 60,
                    backgroundColor: "white",
                  }}
                />
                <TouchableOpacity
                  style={globalStyles.changeStatusText}
                  onPress={() => this.displayModal(false)}
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
            </View>
          </Modal>
        </View>
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
        <View style={{ marginVertical: 90, backgroundColor: "black" }}>
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            {/*<SimpleLineIcons name="plus" size={34} color="black" />*/}

            <FloatingAction
              actions={[...actions]}
              onPressItem={(name) => {
                console.log(`selected button: ${name}`);
                try {
                  if (name == "Cancel") {
                    this.displayModal(true, name);
                  } else if (name == "Approve") {
                    alert("Your have chosen to approve, please submit");
                  } else if (name == "Pending") {
                    Alert("Booking is still pending for Aprooval or cancel");
                  }
                } catch (error) {
                  alert("could not call the modal");
                }
              }}
              ref={(ref) => {
                this.floatingAction = ref;
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 0,
            top: -100,
          }}
        >
          <MaterialCommunityIcons name="email" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{address}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            top: -90,
          }}
        >
          <FontAwesome5 name="users" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{guest}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            top: -80,
          }}
        >
          <FontAwesome name="phone-square" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>{phone}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            top: -70,
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
            top: -60,
          }}
        >
          <MaterialIcons name="date-range" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
            {new Date(date.toDate()).toDateString()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            top: -50,
          }}
        >
          <Fontisto name="date" size={24} color="#53A1CD" />
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
            {new Date(createdAt.toDate()).toDateString()}
          </Text>
        </View>
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
    );
  }
}
