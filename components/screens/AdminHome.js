import React, { Children, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
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
  };
  constructor(props) {
    super(props);
  }

  getData() {
    /*  return db
      .collection("bookings")
      .doc(user)
      .collection("Reservation")
      .where("email", "!=", email)
      .get()
      .then((documentData) => {
        const data = documentData.data();
        //console.log(auth?.currentUser?.displayName);
        this.setState({ users: data });
        console.log(data);
        console.log(email);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("we were unable to get the BookingDetails");
      });

 
*/
    const uid = auth?.currentUser?.uid;
    return db
      .collection("bookings")
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        const resto = snapshot.docs.map((documentSnap) => documentSnap.data());
        // console.log(resto);
        this.setState({ bookings: resto });
      });

    // const uid = auth?.currentUser?.uid;
    const user = auth?.currentUser;
    const display = user.displayName;
    if (user !== null) {
      //const name = user.displayName;
      // console.log("name:" + name);
      console.log(display);
      const admin = db.collection("admin").doc(uid).get("displayName");

      console.log(admin);
      /**.then((snapshot) => {
          const displayName = snapshot.d;

          const data = documentData.data();

          this.setState({ users: data });
          console.log(data);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("we were unable to get the document");
        }); */
    }
    console.log(uid);
    console.log(user.email);
    //console.log(display);

    /*
    const { name, uid } = this.props.route.params;

    //
    return bookingCollection.collection(name).where("uid", "!=", uid).get();

    const users = query.docs.map((documentSnap) => documentSnap.data());
    console.log(users);

*/
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
              onPress={() => navigate("UpdateRestaurantScreen")}
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
          </ScrollView>
        </View>
        <View>
          <FlatList
            data={this.state.bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={globalStyles.flatlistContainer}>
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
                        onPress={() =>
                          navigate("ViewBooking", {
                            address: item.address,
                            guest: item.guest,
                            phone: item.phone,
                            timeIn: item.timein,
                            timeOut: item.timeOut,
                            date: item.date,
                            createdAt: item.createdAt,
                          })
                        }
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          pending
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
