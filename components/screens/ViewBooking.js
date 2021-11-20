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
import { db } from "../../database/firebase";

const image = require("../../assets/restaurant/register.jpg");

const actions = [
  {
    text: "Pending",
    name: "Pending",
    position: 1,
  },

  {
    text: "Cancel",
    name: "Cancel",
    position: 2,
  },
  {
    text: "Approve",
    name: "Approve",
    position: 3,
  },
];

export default class ViewBooking extends Component {
  state = {
    isVisible: false,
    message: "",
    status: "",
  };
  constructor(props) {
    super(props);
  }

  displayModal(show, name) {
    this.setState({ isVisible: show, status: name });
  }

  updateCancel() {
    const { key } = this.props.route.params;
    const { navigate } = this.props.navigation;
    //console.log(key)
    console.log(this.state.status);
    console.log(this.state.message);

    return db
      .collection("bookings")
      .doc(key)
      .update({
        status: this.state.status,
        message: this.state.message,
      })
      .then((snapShot) => {
        //navigation.navigate("AdminHome");
        alert("Booking has been cancelled");
        this.displayModal(false);
      })
      .then(() => {
        navigate("AdminHome", { key: key });
      })
      .catch((error) => {
        const errorMessage = error.message;
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  updateApprove(status) {
    const { key } = this.props.route.params;
    const { navigate } = this.props.navigation;

    return db
      .collection("bookings")
      .doc(key)
      .update({
        status: status,
        message: "Your booking has been approved",
      })
      .then((snapShot) => {
        alert("Booking has been Approved");
        navigate("AdminHome", { key: key });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  updatePending(status) {
    const { key } = this.props.route.params;
    const { navigate } = this.props.navigation;

    return db
      .collection("bookings")
      .doc(key)
      .update({
        status: status,
        message: "Your booking is still pending...",
      })
      .then((snapShot) => {
        alert("status of booking the booking is still pending");
        navigate("AdminHome", { key: key });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      address,
      guest,
      phone,
      timeIn,
      timeOut,
      date,
      createdAt,
      photo,
      uName,
      uid,
      key,
    } = this.props.route.params;

    return (
      <View style={globalStyles.container}>
        {/**start of the modal */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Modal
            animationType="fade"
            transparent={true}
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
                  onChangeText={(message) =>
                    this.setState({ message: message })
                  }
                />
                <TouchableOpacity
                  style={globalStyles.changeStatusText}
                  onPress={() => {
                    try {
                      this.updateCancel();
                    } catch (error) {
                      const errorMessage = error.message;
                      alert("couldn't update the data");
                    }
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
            </View>
          </Modal>
        </View>
        {/**end of the modal */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              navigate("AdminHome", {
                uid: uid,
              })
            }
          >
            <Ionicons name="ios-chevron-back" size={34} color="#53A1CD" />
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={{ uri: photo }}
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
                //  console.log(`selected button: ${name}`);
                this.setState({ status: name });
                try {
                  if (name == "Cancel") {
                    this.displayModal(true, name);
                  } else if (name == "Approve") {
                    this.updateApprove(name);
                  } else if (name == "Pending") {
                    this.updatePending(name);
                  }
                } catch (error) {}
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
              color: "black",
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
