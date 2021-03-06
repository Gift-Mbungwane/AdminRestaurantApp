import React, { Children, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import bookings from "../../api/bookings";
import { globalStyles } from "../../styles/globalStyles";
import { auth, bookingCollection, db } from "../../database/firebase";
import globalUserModel from "../Model";
import moment from "moment";

export default class AdminHome extends Component {
  state = {
    bookings: null,
    key: "",
  };
  constructor(props) {
    super(props);
  }

  getData() {
    //const { uid } = this.props.route.params;
    //console.log(uid + "this the uid of the admin currently logged");
    try {
      const uid = auth?.currentUser?.uid;
      return db
        .collection("bookings")
        .where("uid", "==", uid)
        .onSnapshot((snapshot) => {
          const resto = snapshot.docs.map((documentSnap) =>
            documentSnap.data()
          );
          //console.log(resto);

          this.setState({ bookings: resto });
        });
    } catch (error) {
      const errorMessage = error.message;
      alert("unable to get the data");
    }
  }

  componentDidMount() {
    this.getData();
  }

  Signout() {
    auth
      .signOut()
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const { navigate } = this.props.navigation;
            navigate("AdminLogIn");
            // alert("account is still signed in");

            // ...
          } else {
            alert("you're now logged out");
            // User is signed out
            // used this if else method on signing out funtionality
          }
        });
      })
      .catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("unable to signout");
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const uid = auth?.currentUser?.uid;

    return (
      <View style={{ width: "100%", height: "100%" }}>
        <TouchableOpacity
          onPress={() => {
            try {
              this.Signout();
            } catch (error) {
              const errorMessage = error.message;
              alert(" Something happened when logging out");
            }
          }}
          style={{ alignSelf: "flex-end", right: 50, marginVertical: 40 }}
        >
          <AntDesign name="logout" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                backgroundColor: "#53A1CD",
                width: 100,
                height: 30,
                alignSelf: "center",
                justifyContent: "center",
                marginHorizontal: 30,
              }}
              onPress={() => navigate("AdminHome")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Bookings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("UserScreen", { uid: uid })}
              style={{
                borderRadius: 12,
                backgroundColor: "#53A1CD",
                width: 100,
                height: 30,
                alignSelf: "center",
                justifyContent: "center",
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                backgroundColor: "#53A1CD",
                width: 100,
                height: 30,
                alignSelf: "center",
                justifyContent: "center",
                marginHorizontal: 30,
              }}
              onPress={() =>
                navigate("AdminMenu", {
                  uid: uid,
                })
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Menu
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.bookings}
            renderItem={({ item }) => {
              return (
                <SafeAreaView>
                  <View item={item} style={globalStyles.flatlistContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flexDirection: "column",
                          marginHorizontal: 20,
                          marginVertical: 10,
                        }}
                      >
                        <Text>email: {item.address}</Text>

                        <Text>phone: {item.phone}</Text>
                        <Text>number of guest: {item.guest}</Text>
                        <Text>time in: {item.timein}</Text>
                        <Text>time out: {item.timeOut}</Text>
                        <Text>
                          date: {new Date(item.date.toDate()).toDateString()}
                        </Text>
                        <Text>
                          Created At:
                          {new Date(item.createdAt.toDate()).toDateString()}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 20,
                          backgroundColor: "grey",
                          width: 120,
                          height: 40,
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            navigate("ViewBooking", {
                              address: item.address,
                              guest: item.guest,
                              phone: item.phone,
                              timeIn: item.timein,
                              timeOut: item.timeOut,
                              date: item.date,
                              createdAt: item.createdAt,
                              photo: item.photoURL,
                              uName: item.uName,
                              uid: uid,
                              key: item.key,
                            });
                          }}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                            }}
                          >
                            {item.status}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              );
            }}
            keyExtractor={(item, index) => item.uid}
          />
        </View>
      </View>
    );
  }
}
