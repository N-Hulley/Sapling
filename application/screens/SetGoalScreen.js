import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import {
    Button,
    ListItem,
    Text, Input
} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {api} from './../config';
import {generateGUID} from './../utils'
class SetGoalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: ""
        }
      }
    async setup(user, usergoal) {
        let data = {
            userID: user.id,
            loginToken: generateGUID(),
            fname: user.fname,
            lname: user.lname,
            goal: usergoal,
        }
        const response = await fetch(api.firstInsert + "?userID=" + data.userID + "&loginToken="+ data.loginToken + "&fname=" + data.fname + "&lname=" + data.lname + "&goal=" + data.goal, {
        method: 'POST',
        body: "",
        headers: {
          '-Type': 'application/json',
        },
        
      });
      const responseData = await response.json(); //extract JSON from the http response
      // do something with myJson
      console.log(responseData.user);
      if (responseData.code == 200){
                this.props.navigation.replace('Home', { user: responseData.user })
    
      } else {
          alert("Something went wrong, please try again later");
      }
    
      }
    static navigationOptions = {
        title: "Set Goal",
        headerShown: false
    };


    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { navigation } = this.props;
        const { search } = this.state;
        const user = (navigation.getParam('user', 'NONE'));
        const canCancel = (navigation.getParam('canCancel', false));
        if (user == 'NONE') this.props.navigation.replace('Login');
        console.log(user);
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/gradient.jpg")}
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            marginTop: 0,
                            alignItems: "center",
                            height: "100%"
                        }}
                    >
                        <ListItem
                            rightAvatar={{
                                showEditButton: true,
                                title: user.fname[0] + user.lname[0],
                                source: { uri: user.image }

                            }}
                            containerStyle={{
                                paddingTop: 50,
                                width: "100%",
                                borderBottomWidth: 2,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 50,
                                zIndex: 50,
                                borderBottomColor: "#000"
                            }}
                            title={user.fname + " " + user.lname}
                            subtitle={user.email}
                        />
                        <ScrollView
                            containerStyle={{
                                alignSelf: "stretch",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1,
                                elevation: 1
                            }}
                            contentContainerStyle={{ width: "100%", paddingBottom: 20 }}
                        >
                            <View style={{ ...styles.mainDiv, ...{} }}>
                                <Text h1>Set Your Goal</Text>
                                <Text>This is something you will do everyday</Text>

                            </View>
                            <View style={styles.mainDiv}>
                                <Input
                                placeholder='Example: "Do five pushups"'
                                inputContainerStyle={{width: "100%"}}
                                label="Your goal"
                                ref= {(el) => { this.goal = el; }}
    onChangeText={(goal) => this.setState({goal})}
    value={this.state.goal}
                            />
                            <View style={{flex:1, paddingTop: 10, justifyContent: "center", flexDirection: "row-reverse",minWidth:"95%"}}>
                            <Button
                                    title="Accept"
                                    onPress={() => {
                                        if(canCancel) {
                                            this.props.navigation.goBack();

                                        } else {
                                            this.setup(user, this.state.goal )
                                        }
                                    }}
                                    buttonStyle={{flex:canCancel?1:0,  minWidth:canCancel? "47.5%":"95%"}}
                                /><Button
                                    title="Cancel"
                                    type="clear"
                                    onPress={() =>
                                        this.props.navigation.goBack()
                                    }
                                    buttonStyle={{flex:1,display: canCancel? "flex":"none", minWidth: "47.5%"}}
                                />
                            </View>
                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
/*
<SearchBar
                                placeholder="Search..."
                                onChangeText={this.updateSearch}
                                value={search}
                                containerStyle={{ backgroundColor: "transparent", width: "90%", flex:1 }}
                                inputContainerStyle={{ backgroundColor: "#EEE" }}
                                contentContainerStyle={{borderColor:"red"}}
                                inputStyle={{color:"red"}}
                                round={true}
                            />


*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#999",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center"
    },
    mainDiv: {
        width: "90%",
        maxWidth: "90%",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 0,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        alignItems: "center",
        minWidth: "90%"
    }
});
export default SetGoalScreen;
