import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { writeToCache, readFromCache } from './../localCache/LocalCache';
import { NavigationEvents } from 'react-navigation';
import Colors from '../globals/Colors';

let md = [];
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export class MedicineLog extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            date: [],
            medicine: [],
            today: false,
            enter: false,
            value: 0,
        });
    }

    async UNSAFE_componentWillMount() {
        let medicine = await readFromCache("medicine");
        console.log(medicine);
        if (medicine !== null) {
            let x = medicine;
            x = x.substring(1);
            x = x.substring(0, x.length - 1);
            const m = x.split(",");
            let arr = [];
            for (let i = 0; i < m.length; i++) {
                arr.push(m[i]);
            }
            console.log(arr);
            this.setState({
                medicine: arr
            })
        }
    }


    render() {
        return (
            <View style={{ flex: 1, padding: 12, alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgb(70,70,70)' }}>
                <NavigationEvents />
                <ScrollView  contentContainerStyle={{
                    padding: 20,
                }} style={{
                    width: "100%",
                    maxHeight: height / 2.5,
                    borderRadius: 16,
                    backgroundColor: "rgb(30,30,30)",
                }}>
                    {
                        this.state.medicine.map(result => (
                            <Text style={{fontSize: 16, color: 'white'}}>
                                {result.toString() + '\n'}
                            </Text>
                        ))
                    }
                </ScrollView>

                <View style={styles.description}>
                    <Text style={{
                        textAlign: "center", fontSize: 25, color: 'rgb(220,220,220)',
                    }}>Today's Medicine</Text>
                    <Text style={{
                        color: 'rgb(220,220,220)',
                        marginTop: 20, paddingLeft: 15, paddingRight: 15, fontSize: 20
                    }}>You haven't entered your medicine today.</Text>
                    <Text style={{
                        color: 'rgb(220,220,220)',
                        marginTop: 20, paddingLeft: 15, paddingRight: 15, fontSize: 20
                    }}>(Start entering your medicine by press "Enter" button below.)</Text>
                    <DialogInput isDialogVisible={this.state.enter}
                        title={"Enter today's Medicine"}
                        message={"What medicine you had today?"}
                        hintInput={""}
                        submitInput={async (inputText) => {
                            let arr = [];
                            if (this.state.medicine !== null) {
                                arr = this.state.medicine;
                            }
                            arr.push(inputText);
                            this.setState({ value: inputText, enter: false, medicine: arr });
                            console.log(arr.toString());
                            await writeToCache("medicine", "[" + arr.toString() + "]");
                            // await writeToCache("name", inputText);
                        }}
                        closeDialog={() => { this.setState({ enter: false }) }}>
                    </DialogInput>

                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.setState({ enter: true })}>
                    <Text style={{ height: "100%", textAlign: "center", textAlignVertical: "center", fontSize: 18 }}>Enter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginTop: 20,
        flex: 1,
    },
    button: {
        position: "absolute",
        bottom: 0,
        left: 0,

        width: width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // height: 30,
        padding: 26,
        // height: 60,
        backgroundColor: Colors.themeColorPrimary
    }
});
