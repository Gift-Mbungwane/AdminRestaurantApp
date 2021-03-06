import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AdminHome from "./components/screens/AdminHome";
import AdminLogIn from "./components/screens/AdminLogIn";
import AdminRegister from "./components/screens/AdminRegister";
import Main from "./components/screens/Main";
import UpdateRestaurantScreen from "./components/screens/UpdateRestaurantScreen";
import ViewBooking from "./components/screens/ViewBooking";
import AdminMenu from "./components/screens/AdminMenu";
import UserScreen from "./components/screens/UserScreen";
import Restaurantdetails from "./components/screens/Restaurantdetails";
const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AdminLogIn" component={AdminLogIn} />
          <Stack.Screen name="AdminRegister" component={AdminRegister} />
          <Stack.Screen
            name="UpdateRestaurantScreen"
            component={UpdateRestaurantScreen}
          />
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="ViewBooking" component={ViewBooking} />
          <Stack.Screen name="AdminMenu" component={AdminMenu} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen
            name="Restaurantdetails"
            component={Restaurantdetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
