import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import DialogInput from 'react-native-dialog-input';
import { writeToCache, readFromCache, deleteItem } from './../localCache/LocalCache';
import { NavigationEvents } from 'react-navigation';
import Colors from '../globals/Colors';
import axios from 'axios';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export class BloodPressure extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            date: [],
            pressure: [123, 114, 100, 103, 102],
            lowPressure: [72, 78, 80, 78, 76],
            today: false,
            enter: false,
            enterLow: false,
            value: 0,
            v1: false,
            v2: false,
        });
    }

    async UNSAFE_componentWillMount() {
        // await deleteItem("bloodPressure")
        // await deleteItem("bloodPressureLow")
        let bloodPressure = await readFromCache("bloodPressure");
        let bloodPressureLow = await readFromCache("bloodPressureLow");

        if (bloodPressure) {
            let x = bloodPressure;
            x = x.substring(1);
            x = x.substring(0, x.length - 1);
            const m = x.split(",");
            let arr = [];
            for (let i = 0; i < m.length; i++) {
                arr.push(parseInt(m[i]));
            }
            console.log(arr);
            this.setState({
                pressure: arr
            })
        }

        if (bloodPressureLow) {
            let x = bloodPressureLow;
            x = x.substring(1);
            x = x.substring(0, x.length - 1);
            const m = x.split(",");
            let arr = [];
            for (let i = 0; i < m.length; i++) {
                arr.push(parseInt(m[i]));
            }
            console.log(arr);
            this.setState({
                lowPressure: arr
            })
        }
    }

    async handleSubmit() {
        let user_id = await readFromCache("user_id");
        let config = {
            headers: {
                app_user_id: user_id,
                app_user_name: user_id
            }
        }
        let data = {
            "Item" : {
                "high": Number.parseInt(this.state.pressure[this.state.pressure.length-1]),
                "low": Number.parseInt(this.state.lowPressure[this.state.lowPressure.length-1]),
            }
        }
        let url = "https://b898utamg6.execute-api.us-east-1.amazonaws.com/prod/blood"
        console.log(user_id)
        console.log(data)
        axios.post(url, data, config);
        this.props.navigation.navigate('My Dashboard');
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 12, alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgb(70,70,70)' }}>
                <NavigationEvents />
                <ScrollView horizontal={true} contentContainerStyle={{
                }} style={{
                    borderRadius: 16,
                    backgroundColor: "rgb(30,30,30)",

                    maxHeight: height / 2.5,
                }}>
                    <LineChart
                        data={{

                            datasets: [
                                {
                                    data: this.state.pressure
                                },
                                {
                                    data: this.state.lowPressure
                                }
                            ]
                        }}
                        width={120 + 50 * data.length} // from react-native
                        height={300}
                        yAxisInterval={100} // optional, defaults to 1
                        verticalLabelRotation={30}

                        chartConfig={{
                            backgroundColor: "rgb(30,30,30)",

                            backgroundGradientFrom: "rgb(30,30,30)",
                            backgroundGradientTo: "rgb(30,30,30)",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: Colors.themeColorPrimary
                            },
                        }}
                        bezier
                        style={{

                        }}
                    />
                </ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.description}>
                    <Text style={{
                        color: 'rgb(220,220,220)',
                        textAlign: "center", fontSize: 25
                    }}>
                        Today's Blood Pressure
                        </Text>
                    <Text style={{
                        color: 'rgb(220,220,220)',
                        marginTop: 20, paddingLeft: 15, paddingRight: 15, fontSize: 20
                    }}>
                        You haven't entered your blood pressure today
                        </Text>
                    <Text style={{
                        color: 'rgb(220,220,220)',
                        marginTop: 20, paddingLeft: 15, paddingRight: 15, fontSize: 20
                    }}>
                        (Start entering your blood pressure by press "Enter" button below)
                        </Text>
                    <DialogInput isDialogVisible={this.state.enter}
                        title={"Enter your Blood Pressure"}
                        message={"Please enter your Systolic blood Pressure"}
                        hintInput={"eg. 120(mmHg)"} textInputProps={{keyboardType: "number-pad" }}
                        submitInput={async (inputText) => {
                            let arr = [];
                            if (this.state.pressure) {
                                arr = this.state.pressure;
                            }
                            // console.log(typeof(inputText) === "number")


                            arr.push(inputText);
                            this.setState({ value: inputText, enter: false, pressure: arr });
                            await writeToCache("bloodPressure", "[" + arr.toString() + "]");

                            await writeToCache("name", inputText);

                        }}
                        closeDialog={() => { this.setState({ enter: false }) }}>
                    </DialogInput>

                    <DialogInput isDialogVisible={this.state.enterLow}
                        title={"Enter your Blood Pressure"}
                        message={"Please enter your Diastolic blood Pressure"}
                        hintInput={"eg. 80(mmHg)"}
                        textInputProps={{keyboardType: "number-pad" }}
                        submitInput={async (inputText) => {
                            let arr = [];
                            if (this.state.lowPressure) {
                                arr = this.state.lowPressure;
                            }
                            arr.push(inputText);
                            this.setState({ value: inputText, enterLow: false, lowPressure: arr });
                            await writeToCache("bloodPressureLow", "[" + arr.toString() + "]");
                            // await writeToCache("name", inputText);
                        }}
                        closeDialog={() => { this.setState({ enterLow: false }) }}>
                    </DialogInput>

                </KeyboardAvoidingView>
                {this.state.v1 === false || this.state.v2 === false ?
                    <View style={styles.bottomArea}>
                    <TouchableOpacity style={styles.button1} onPress={() => this.setState({ enter: true, v1: true })}>
                        <Text style={{ height: "100%", textAlign: "center", textAlignVertical: "center", fontSize: 20, color: 'black' }}>Enter Systolic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => this.setState({ enterLow: true, v2: true  })}>
                        <Text style={{ height: "100%", textAlign: "center", textAlignVertical: "center", fontSize: 20, color: 'black' }}>Enter Diastolic</Text>
                    </TouchableOpacity></View>
                    :
                    <TouchableOpacity style={styles.button3} onPress={this.handleSubmit.bind(this)}>
                        <Text style={{ height: "100%", textAlign: "center", textAlignVertical: "center", fontSize: 20, color: 'black' }}>Submit</Text>
                    </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    description: {
        marginTop: 20,
        flex: 1,
    },
    button1: {
        position: "absolute",
        bottom: 0,
        left: 0,

        width: width / 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // height: 30,
        padding: 30,
        // height: 60,
        backgroundColor: Colors.themeColorPrimary,

        borderRightColor: 'rgb(70,70,70)',
        borderRightWidth: 1,
        borderTopRightRadius: 16,
        // borderright
    },
    button2: {
        position: "absolute",
        bottom: 0,
        left: width / 2,

        width: width / 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // height: 30,
        padding: 30,
        // height: 60,
        backgroundColor: Colors.themeColorPrimary,


        borderLeftColor: 'rgb(70,70,70)',
        borderLeftWidth: 1,
        borderTopLeftRadius: 16,
    },

    button3: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 30,
        // height: 60,
        backgroundColor: Colors.themeColorPrimary,


        borderLeftColor: 'rgb(70,70,70)',
    },
    bottomArea: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
    }
});