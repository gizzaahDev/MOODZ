import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignupScreen from "../screens/SignupScreen";
import DataScreen from "../screens/DataScreen";

const AppNavigator = createStackNavigator(
  {
    Signup: SignupScreen,
    Data: DataScreen,
  },
  {
    initialRouteName: "Signup",
  }
);

export default createAppContainer(AppNavigator);
