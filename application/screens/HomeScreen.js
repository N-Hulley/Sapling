import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import {
    Button,
    ListItem,
    Text,
    Badge,
    ActivityIndicator,
    SearchBar,
    Card,
    Icon,
    Divider
} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Emoji from "react-native-emoji";
import {api} from './../config'

let timeLeft = 3;
let goalCompleted = false;
let currentTree = 2;
const trees = [
    require(`../assets/trees/0.png`),
    require(`../assets/trees/1.png`),
    require(`../assets/trees/2.png`)
]
class HomeScreen extends React.Component {
    getHoursLeft(user) {
        
        if (user.goalCompleted) return "Completed for today";
        let completeBy = new Date(user.goalCompletedTime);
        completeBy.setDate(completeBy.getDate() + 2);
        let today = new Date() - 1;
        let seconds = Math.floor((completeBy - (today))/1000);
        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);
        
        hours = hours-(days*24);

        
        return hours + " hours left";

    }
    async goalCompleted(user) {

        const response = await fetch(api.goalCompleted + "?userID=" + user.userID + "&loginToken=" + user.loginToken, {
        method: 'POST',
        body: "",
        headers: {
          '-Type': 'application/json',
        },
        
      });
       const responseData = await response.json(); //extract JSON from the http response
    //   // do something with myJson
      console.log(responseData);
      if (responseData.code == 200){
                user = responseData.user;
                this.props.navigation.replace('Home', { user: user })
    
                
      } else {
          alert("Something went wrong, please try again later");
      }
    }
    constructor(props) {
        super(props);
        this.state = {
            hideGoal: false,
          posts:[
              {
                  name: "Sam Smith",
                  goal: "Wake up before 7am",
                  tree: 2,
                  image: "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png",

                  streak: 8
              },
              {
                  name: "John Doe",
                  goal: "Do 5 pushups per day",
                  tree: 1,
                  image: "https://img.cinemablend.com/filter:scale/quill/a/8/8/7/4/b/a8874b4880937efbf322bf118e67b02568756a86.jpg",
                  streak: 3
              }
          ]
        }
      }
    static navigationOptions = {
        title: "Home",
        headerShown: false
    };

    state = {
        search: ""
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { navigation } = this.props;
        const { search } = this.state;
        const user = (navigation.getParam('user', 'NONE'));
        if (user == 'NONE') this.props.navigation.replace('Login');
        if (!this.state.hideGoal && user.goalCompleted)
            this.setState({hideGoal: user.goalCompleted});
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
                                <Badge
                                    status="primary"
                                    value="Change"
                                    containerStyle={{ position: "absolute", top: 4, right: 4 }}
                                    onPress={() => {
                                        this.props.navigation.navigate('SetGoal', { user: user , canCancel: true })
}
                                    }
                                
                                />
                                <Text h1>Goal</Text>
                                <Text subtitle>{user.goal}</Text>
                            </View>
                            <View style={{...styles.mainDiv, ...{display: this.state.hideGoal? "none": "flex"}}}>
                                <Text h4>Have you completed your goal for today?</Text>
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: 10,
                                        flexDirection: "row-reverse",
                                        justifyContent: "space-between",
                                        paddingLeft: 5,
                                        paddingRight: 5
                                    }}
                                >
                                    <Button
                                        title="YES"
                                        containerStyle={{ flex: 1, margin: 3 }}
                                        type="solid"
                                        raised={true}
                                        onPress={() => {
                                            this.goalCompleted(user);
                                        }
                                    }
                                    />
                                    <Button
                                        containerStyle={{ flex: 1, margin: 3 }}
                                        title="NOT YET"
                                        type="outline"
                                        raised={true}
                                        onPress={() => {
                                            this.setState({hideGoal: true})
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.mainDiv}>
                                <Text h1>Your Streak</Text>
                                <Badge
                                    status={user.goalCompleted? "primary": "error"}
                                    value={this.getHoursLeft(user)}
                                    containerStyle={{ position: "absolute", top: 4, right: 4}}
                                />
                                <View
                                    style={{
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        marginTop: 10
                                    }}
                                >
                                    <Emoji name="fire" style={{ fontSize: 30 }} />

                                    <Text style={{ fontSize: 30 }}>{user.streak} days</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require(`../assets/trees/${currentTree}.png`)}
                                        style={{ width: 300, height: 300, resizeMode: "contain" }}
                                    />
                                </View>
                            </View>

                            <View style={styles.mainDiv}>
                                <Text h1>Social</Text>
                                <View style={{ marginLeft: 10, marginRight: 10 }}>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            <Emoji name="heart" style={{ fontSize: 30 }} />{" "}
                                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                                            {user.lovers.length}
                      </Text>{" "}
                                            people love your goal
                    </Text>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            <Emoji name="camera" style={{ fontSize: 30 }} /> You have
                      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                                                {" "}
                                                
                                            {user.followers.length}
                      </Text>{" "}
                                            followers
                    </Text>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            <Emoji name="link" style={{ fontSize: 30 }} />
                                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                                                {" "}
                                                {user.sharedby.length}

                      </Text>{" "}
                                            people have shared your goal
                    </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    ...styles.mainDiv,
                                    ...{ flex: 1, justifyContent: "center" }
                                }}
                            >
                                {
                                this.state.posts.map((p, i) => (
                                    <View
                                    key={i}
                                    style={{
                                        ...styles.mainDiv,
                                        ...{
                                            flex: 1,
                                            justifyContent: "flex-start",
                                            width: "85%",
                                            marginTop: 0,
                                            flexDirection: "column",
                                            marginBottom: 10
                                        }
                                    }}
                                >
                                    
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "flex-start",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View style={{ flex: 2 }}>
                                            <ListItem
                                                leftAvatar={{
                                                    title: p.name[0],
                                                    source: {uri: p.image},

                                                    showEditButton: false
                                                }}
                                                title={p.name}
                                                subtitle={p.goal}
                                                containerStyle={{ width: "100%" }}
                                            />
                                            <View
                                                style={{
                                                    justifyContent: "flex-start",
                                                    marginLeft: 10,
                                                    flexDirection: "row",
                                                    marginTop: 0
                                                }}
                                            >
                                                <Emoji name="fire" style={{ fontSize: 20 }} />

                                                <Text style={{ fontSize: 16 }}>{p.streak} days</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            
                                        <Image
                                                source={trees[p.tree]}
                                                style={{ height: 100, flex: 1, width: 100 }}
                                                resizeMode={"contain"}
                                            ></Image>
                                            <Badge
                                                status="primary"
                                                value={
                                                    <Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            color: "#FFF",
                                                            fontSize: 15
                                                        }}
                                                    >
                                                        X
                          </Text>
                                                }
                                                onPress={() => {
                                                    let pp = this.state.posts;
                                                    pp.splice(i, 1);

                                                    this.setState({posts: pp})

                                                }}
                                                containerStyle={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4
                                                }}
                                            />
                                        </View>
                                        
                                    </View>
                                    <View style={{
                                        flexDirection: "row", justifyContent: "center", shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        }, width: "90%"
                                    }}>
                                        <Button
                                            title="FOLLOW"
                                            type="clear"
                                            buttonStyle={{ backgroundColor: "#44FF44", margin: 4 }}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                                        /><Button
                                            title="SHARE"
                                            type="clear"
                                            buttonStyle={{ backgroundColor: "blue", margin: 4 }}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                                        /><Button
                                            title="BLOCK"
                                            type="clear"
                                            buttonStyle={{ backgroundColor: "red", margin: 4 }}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}

                                            containerStyle={{ flex: 1 }}
                                        />
                                    </View>
                                </View>
                                ))
                                }
                                </View>
                                
                            <View
                                style={{
                                    ...styles.mainDiv,
                                    ...{ justifyContent: "space-around" }
                                }}
                            >
                                <Button
                                    onPress={() =>
                                        this.props.navigation.replace("Login", { name: "Jane" })
                                    }
                                    title="SIGN OUT"
                                    type="solid"
                                    raised={true}
                                    buttonStyle={{ backgroundColor: "red", flex: 1, minWidth: "95%" }}
                                    titleStyle={{ fontWeight: "bold" }}
                                    containerStyle={{ flex: 1 }}
                                />
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
export default HomeScreen;
