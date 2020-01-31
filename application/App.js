'use strict';
import React from "react";

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UserPickerScreen from "./screens/UserPickerScreen"
import SetGoalScreen from "./screens/SetGoalScreen"


const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen },
  Home: {screen: HomeScreen },
  UserPicker: {screen: UserPickerScreen},
  SetGoal: {screen: SetGoalScreen}
});

const App = createAppContainer(MainNavigator);

export default App;

