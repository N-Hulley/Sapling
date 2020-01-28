import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import {  Image } from "react-native-elements";
import Login from "../components/Login";

class LoginSCreen extends React.Component {
    
  static navigationOptions = {
    title: 'Welcome',
    headerShown: false,
  };
    render() {
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
          <View style={{ width: "100%", flex: 1 }}>
            <Image
              source={require("../assets/sapling.png")}
              PlaceholderContent={<ActivityIndicator />}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Login navigation={this.props.navigation}></Login>
          </View>
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
  
  export default LoginSCreen;