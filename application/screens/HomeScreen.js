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

let timeLeft = 3;
let goalCompleted = false;
let currentTree = 2;

class HomeScreen extends React.Component {
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
        const { search } = this.state;

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
                                title: "JD",
                                showEditButton: true,
                                source: require("../assets/social.jpg")
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
                            title={"John Doe"}
                            subtitle={"ASDD"}
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
                                <Text h1>Goal</Text>
                                <Text subtitle>Do five pushups</Text>
                            </View>
                            <View style={styles.mainDiv}>
                                <Text h4>Have you completed your goal for today?</Text>
                                <View
                                    style={{
                                        flex: 1,
                                        marginTop: 10,
                                        flexDirection: "row",
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
                                    />
                                    <Button
                                        containerStyle={{ flex: 1, margin: 3 }}
                                        title="NOT YET"
                                        type="outline"
                                        raised={true}
                                    />
                                </View>
                            </View>

                            <View style={styles.mainDiv}>
                                <Text h1>Your Streak</Text>
                                <Badge
                                    status="error"
                                    value="3 Hours left"
                                    containerStyle={{ position: "absolute", top: 4, right: 4 }}
                                />
                                <View
                                    style={{
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        marginTop: 10
                                    }}
                                >
                                    <Emoji name="fire" style={{ fontSize: 30 }} />

                                    <Text style={{ fontSize: 30 }}>8 days</Text>
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
                                                12
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
                                                5
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
                                                3
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
                                <View
                                    style={{
                                        ...styles.mainDiv,
                                        ...{
                                            flex: 1,
                                            justifyContent: "flex-start",
                                            width: "85%",
                                            marginTop: 0,
                                            flexDirection: "column"
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
                                                    title: "SS",
                                                    source: require("../assets/social.jpg"),

                                                    showEditButton: false
                                                }}
                                                title={"Sam Smith"}
                                                subtitle={"Wake up before 7am"}
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

                                                <Text style={{ fontSize: 16 }}>8 days</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
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
                                                containerStyle={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4
                                                }}
                                            />
                                            <Image
                                                source={require("../assets/trees/1.png")}
                                                style={{ height: 100, flex: 1, width: 100 }}
                                                resizeMode={"contain"}
                                            ></Image>
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
                                            buttonStyle={{ backgroundColor: "#44FF44", margin: 4}}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                                        /><Button
                                            title="SHARE"
                                            type="clear"
                                            buttonStyle={{ backgroundColor: "blue", margin: 4}}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                                        /><Button
                                            title="BLOCK"
                                            type="clear"
                                            buttonStyle={{ backgroundColor: "red", margin: 4}}
                                            titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                                            
                                            containerStyle={{flex:1}}
                                        />
                                    </View>
                                </View>
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
                                    buttonStyle={{ backgroundColor: "red", flex: 1 }}
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
