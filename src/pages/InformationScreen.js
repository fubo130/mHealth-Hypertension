import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { writeToCache, readFromCache } from './../localCache/LocalCache';
import * as SecureStore from 'expo-secure-store';
import { findCoordinates } from '../utils/findCoordinate';
import DialogInput from 'react-native-dialog-input';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import Colors from './../globals/Colors'


const info = require('./../imageAssets/dark.jpg');
const male = require('./../imageAssets/male.jpg');
const female = require('./../imageAssets/fem.jpeg');

export class InformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            user: "",
            name: "",
            gender: "Male",
            age: "",
            education: "",
            area: "",
            medicalHistory: "",
            showName: false,
            showAge: false,
            showEducation: false, 
            showArea: false,
            showHistory: false
        }
    }
    
    async UNSAFE_componentWillMount() {
        const u_user = await readFromCache("user");
        const u_name = await readFromCache("name");
        const u_gender = await readFromCache("gender");
        const u_age = await readFromCache("age");
        const u_edu = await readFromCache("education");
        const u_area = await readFromCache("area");
        const u_medicalHistory = await readFromCache("medicalHistory");
        this.setState({
            user: u_user,
            name: u_name ? u_name : "Harry Potter",
            gender: u_gender ? u_gender: "Female",
            age: u_age ? u_age: 18,
            education: u_edu ? u_edu : "Bachelor",
            area: u_area ? u_area : "Bombay",
            medicalHistory: u_medicalHistory ? u_medicalHistory : "none"
        })
    
    }

    handleInput(type) {
        console.log(type);
        switch(type) {
            case "name":
                this.setState({
                    showName: true
                })
                break;
            case "gender": 
                Alert.alert(
                    'Select your answer: ',
                    'Please select your gender.',
                    [
                        {
                            text: 'Male', 
                            onPress: async () => {
                                this.setState({
                                    gender: 'Male'
                                }, async () => {
                                    await writeToCache("gender", this.state.gender);
                                });
                                console.log(await readFromCache("gender"));
                            }
                        },
                        {
                            text: 'Female', 
                            onPress: async () => {
                                this.setState({
                                    gender: 'Female'
                                }, async () => {
                                    await writeToCache("gender", this.state.gender);
                                });
                                
                                console.log(await readFromCache("gender"));
                            }
                        }
                    ],
                    { cancelable: false }
                );
                break;
            case "age": 
                this.setState({
                    showAge: true
                })
                break;
            case "education":
                this.setState({
                    showEducation: true
                })
                break;
            case "area":
                this.setState({
                    showArea: true
                })
                break;
            case "history": 
                this.setState({
                    showHistory: true
                })
                break;
            default:
                return;
        }
    }

    prompt() {
        Alert.alert(
            'mHealth Hypertension Research',
            'To help our study of hypertension, you can provide your information. Select and edit the information that you want to share with us',
            [
                {
                    text: 'OK', 
                },
            ],
            { cancelable: false }
        );
    }

    async handleSubmit() {
        let user_id = await readFromCache("user_id");
        let config = {
            headers: {
                app_user_id: user_id,
                app_user_name: user_id
            }
        }
        let loc_url = "https://b898utamg6.execute-api.us-east-1.amazonaws.com/prod/location"
        let loc = JSON.parse(await readFromCache("loc"));
        let loc_data = {
            "Item": {
                "latitude": loc['coords']["latitude"],
                "longitude": loc['coords']["longitude"]
            }
        }
        await axios.post(loc_url, loc_data, config);
        let profile_data = {
            "Item": {
                "name": this.state.name,
                "gender": this.state.gender,
                "age": Number.parseInt(this.state.age),
                "education": this.state.education,
                "area": this.state.area,
                "medicalHistory": this.state.medicalHistory
            }
        }
        let prof_url = "https://b898utamg6.execute-api.us-east-1.amazonaws.com/prod/profile"
        axios.post(prof_url, profile_data, config).then().catch(err => console.log(err));
        this.props.navigation.navigate('My Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.prompt} onPress={this.prompt.bind(this)}>
                    <AntDesign
                        color={ Colors.themeColorPrimary}
                        name="questioncircleo"
                        size={26}
                    />
                </TouchableOpacity>
                <Image style={styles.background} source={info} />
                {this.state.gender==="Female"?<Image style={styles.avt} source={female}></Image>:
                <Image style={styles.avt} source={male}></Image>
                }
                
                {this.state.page === 0 ? 
                    <View>
                        <Text style={styles.title}>General Information</Text>
                        <Text style={styles.name}>Name</Text>
                        <TouchableOpacity style={styles.uname} onPress={this.handleInput.bind(this, "name")}>
                            {this.state.name === null?
                                <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>Harry Potter</Text>:
                                <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.name}</Text>
                            }
                        </TouchableOpacity>
                        
                        <DialogInput isDialogVisible={this.state.showName}
                            title={"Enter your answer"}
                            message={"Please enter your name"}
                            hintInput ={"Harry Potter"}
                            submitInput={ async (inputText) => {
                                this.setState({name: inputText, showName: false});
                                await writeToCache("name", inputText);
                            }}
                            closeDialog={ () => {this.setState({showName: false})}}>
                        </DialogInput>

                        <Text style={styles.gender}>Gender</Text>
                        <TouchableOpacity style={styles.ugender} onPress={this.handleInput.bind(this, "gender")}>
                            {this.state.gender === null?<Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>Male</Text>:
                            <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.gender}</Text>
                            }     
                        </TouchableOpacity>

                        <Text style={styles.age}>Age</Text>
                        <TouchableOpacity style={styles.uage} onPress={this.handleInput.bind(this, "age")}>
                            {this.state.age === null ? <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>18</Text>:
                            <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.age}</Text>
                            }
                        </TouchableOpacity>
                        <DialogInput isDialogVisible={this.state.showAge}
                            title={"Enter your answer"}
                            message={"Please enter your Age"}
                            hintInput ={"18"}
                            textInputProps={{keyboardType: "number-pad" }}
                            submitInput={ async (inputText) => {
                                this.setState({age: inputText, showAge: false});
                                await writeToCache("age", inputText);
                            }}
                            closeDialog={ () => {this.setState({showAge: false})}}>
                        </DialogInput>
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>Detail Information</Text>
                        <Text style={styles.education}>Education</Text>
                        <TouchableOpacity style={styles.ueducation} onPress={this.handleInput.bind(this, "education")}>
                            {this.state.education === null ? <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>Bachelor</Text>:
                            <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.education}</Text>
                            }
                        </TouchableOpacity>
                        <DialogInput isDialogVisible={this.state.showEducation}
                            title={"Enter your answer"}
                            message={"Please enter your degree of education"}
                            hintInput ={"Bachelor"}
                            submitInput={ async (inputText) => {
                                this.setState({education: inputText, showEducation: false});
                                await writeToCache("education", inputText);
                            }}
                            closeDialog={ () => {this.setState({showEducation: false})}}>
                        </DialogInput>

                        <Text style={styles.area}>Area</Text>
                        <TouchableOpacity style={styles.uarea} onPress={this.handleInput.bind(this, "area")}>
                            {this.state.area === null ? <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>India Bombay</Text>:
                            <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.area}</Text>
                            }
                        </TouchableOpacity>
                        <DialogInput isDialogVisible={this.state.showArea}
                            title={"Enter your answer"}
                            message={"Please enter your Area"}
                            hintInput ={"Bombay"}
                            submitInput={ async (inputText) => {
                                this.setState({area: inputText, showArea: false});
                                await writeToCache("area", inputText);
                            }}
                            closeDialog={ () => {this.setState({showArea: false})}}>
                        </DialogInput>

                        <Text style={styles.history}>Medical History</Text>
                        <TouchableOpacity style={styles.uhistory} onPress={this.handleInput.bind(this, "history")}>
                            {this.state.medicalHistory === null?<Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>none</Text>:
                            <Text style={{fontSize: 25, color: "rgb(213, 216, 224)", textAlign: 'center'}}>{this.state.medicalHistory}</Text>
                            }
                        </TouchableOpacity>
                        <DialogInput isDialogVisible={this.state.showHistory}
                            title={"Enter your answer"}
                            message={"Please enter your medical history"}
                            hintInput ={"Coronary Heart Disease"}
                            submitInput={ async (inputText) => {
                                this.setState({medicalHistory: inputText, showHistory: false});
                                await writeToCache("history", inputText);
                            }}
                            closeDialog={ () => {this.setState({showHistory: false})}}>
                        </DialogInput>
                    </View>
                }
                <TouchableOpacity style={styles.btn1} onPress={() => {
                    this.state.page === 0 ? this.setState({page: 1}):this.setState({page: 0})}}>
                    {this.state.page === 0?
                    <Text style={{fontSize: 22, color: "white", textAlign: 'center', padding: 10}}>Detail</Text>:
                    <Text style={{fontSize: 22, color: "white", textAlign: 'center', padding: 10}}>General</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={this.handleSubmit.bind(this)}>
                    <Text style={{fontSize: 22, color: "white", textAlign: 'center', padding: 10}}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(32, 34, 41)'
    },

    prompt: {
        width: 26,
        height: 26, 
        // opacity: 0.6,
        // backgroundColor: "red",
        position: 'absolute',
        top: 16,
        right: 16,
        borderRadius: 100,
        zIndex: 998,
    },

    background: {
        width: '100%',
        height: 200,
    },

    title: {
        position: 'absolute',
        fontSize: 29,
        color: "white",
        alignSelf: 'center',
        top: 50,
    },

    avt: {
        width: 120,
        height: 120,
        borderRadius: 200,
        position: "absolute",
        top: 120,
        alignSelf: 'center',
    },

    name: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 120,
    },

    uname: {
        position: 'absolute',
        alignSelf: 'center',
        top: 170,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },

    gender: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 230,
    },

    ugender: {
        position: 'absolute',
        alignSelf: 'center',
        top: 280,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },

    age: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 340,
    },

    uage: {
        position: 'absolute',
        alignSelf: 'center',
        top: 390,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },


    education: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 120,
    },

    ueducation: {
        position: 'absolute',
        alignSelf: 'center',
        top: 170,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },

    area: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 230,
    },

    uarea: {
        position: 'absolute',
        alignSelf: 'center',
        top: 280,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },

    history: {
        position: 'absolute',
        fontSize: 25,
        color: "white",
        alignSelf: 'center',
        top: 350,
    },

    uhistory: {
        position: 'absolute',
        alignSelf: 'center',
        top: 400,
        width: '80%',
        left: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 1,
        backgroundColor: 'rgba(63, 67, 80, 0.3)',
    },

    btn1: {
        position: 'absolute',
        width: '50%',
        left: 0,
        height: 70,
        backgroundColor: Colors.themeColorPrimary,
        bottom: 0,
        borderTopRightRadius: 20,
        borderRightWidth: 1,
    },
    btn2: {
        position: 'absolute',
        width: '50%',
        right: 0,
        height: 70,
        backgroundColor: Colors.themeColorPrimary,
        bottom: 0,
        borderTopLeftRadius: 20,
        borderLeftWidth: 1,
    },
});
