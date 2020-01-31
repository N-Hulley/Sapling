import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Image, ListItem, Text } from "react-native-elements";
import { sampleUsers, api } from './../config';


class UserPickerScreen extends React.Component {

  static navigationOptions = {
    title: 'Pick User',
    headerShown: false,
  };
  async login(user) {
    let data = {
      userID: user.id,
      loginToken: user.loginToken
    }
    const response = await fetch(api.userValidation + "?userID=" + data.userID + "&loginToken=" + data.loginToken, {
      method: 'POST',
      body: "",
      headers: {
        '-Type': 'application/json',
      },

    });
    const responseData = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log("Mongo response: ", responseData);
    if (responseData.code == 200) {
      if (responseData.valid) {
        user = { ...user, ...responseData.user };
        this.props.navigation.replace('Home', { user: user })

      } else {
        if (responseData.newUser) {
          this.props.navigation.replace('SetGoal', { user: user, canCancel: false })

        } else
          alert("Login was invalid");

      }
    } else {
      alert("Something went wrong, please try again later");
    }

  }

  static navigationOptions = {
    title: 'Welcome',
    headerShown: false,
  };
  render() {

    let users = sampleUsers;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/gradient.jpg")}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-between"
          }}
        >
          <ScrollView style={{ width: "100%", flex: 1 }} >
            <View style={{ paddingTop: 50, paddingLeft: 20, backgroundColor: "white", }}><Text h1>Pick a User</Text></View>
            {
              users.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: l.image } }}
                  title={l.fname + " " + l.lname}
                  subtitle={l.email}
                  bottomDivider
                  chevron
                  onPress={() => {
                    this.login(l);
                  }}
                />
              ))
            }
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#999",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default UserPickerScreen;