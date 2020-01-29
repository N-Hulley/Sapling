import React from "react";
import { SocialIcon } from "react-native-elements";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
export default class Login extends React.Component {
  render() {       
    return (
      <Card
        title="SAPLING"
        titleStyle={{ letterSpacing: 2, fontSize: 30, fontWeight: "bold" }}
        containerStyle={{ borderRadius: 20, justifyContent: "space-evenly" }}
      >
        <View>
          <Text style={{ marginBottom: 10 }}>
            Welcome to Sapling, to continue, please choose one of the following.
          </Text>

          <SocialIcon
            title="Continue With Facebook"
            button
            style={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            type="facebook"
          />
          <SocialIcon
            title="Continue With Apple"
            button
            style={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "#111"
            }}
            type="apple"
          />
          <SocialIcon
            title="Continue With Google"
            button
            onPress={() => this.props.navigation.replace('Home', {name: 'Jane'})}

            style={{
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            type="google"
          />
        </View>
      </Card>
    );
  }
}
