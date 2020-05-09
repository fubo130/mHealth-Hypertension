import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, SafeAreaView, ScrollView, Animated, ImageBackground, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';

import { LinearGradient } from 'expo-linear-gradient';

import { MHealthBackBtn, MHealthBtn, PlayBtn, SignInBtn, SignUpBtn, EditProfileBtn } from '../customComponents/CustomButtons';


import { AppCredit, AppProgress } from '../globals/appManager';

import { NavigationEvents } from 'react-navigation';

import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import { deleteItem } from '../localCache/LocalCache';

export class DailyCheckinScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checkItemOpa: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
            ]
        }
    }

    startItemAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.checkItemOpa[0], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.checkItemOpa[1], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.checkItemOpa[2], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.checkItemOpa[3], {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={() => this.startItemAnimation()} />
                <Animated.View style={[styles.checkItem, {
                    opacity: this.state.checkItemOpa[0],

                    transform: [
                        {
                            scale: this.state.checkItemOpa[0].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            })
                        }
                    ]
                }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Log Your Meal')} style={styles.checkinTouch}>
                        <MaterialCommunityIcons
                            color={'#ff4573'}
                            name="food-fork-drink"
                            size={50}
                        />
                        <Text style={styles.checkTxt}>
                            Take Picture of Meal
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.checkItem, {
                    opacity: this.state.checkItemOpa[1],

                    transform: [
                        {
                            scale: this.state.checkItemOpa[1].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            })
                        }
                    ]
                }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Blood Pressure')} style={styles.checkinTouch}>
                        <FontAwesome
                            color={'#c945ff'}
                            name="tachometer"
                            size={50}
                        />
                        <Text style={styles.checkTxt}>
                            Log My Blood Pressure
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.checkItem, {
                    opacity: this.state.checkItemOpa[2],

                    transform: [
                        {
                            scale: this.state.checkItemOpa[2].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            })
                        }
                    ]
                }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Medicine Log')} style={styles.checkinTouch}>
                        <MaterialCommunityIcons
                            color={'#4573ff'}
                            name="medical-bag"
                            size={50}
                        />
                        <Text style={styles.checkTxt}>
                            Log My Medicine
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.checkItem, {
                    opacity: this.state.checkItemOpa[3],

                    transform: [
                        {
                            scale: this.state.checkItemOpa[3].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            })
                        }
                    ]
                }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('My Routine')} style={styles.checkinTouch}>
                        <MaterialCommunityIcons
                            color={'#ffb045'}
                            name="run"
                            size={50}
                        />
                        <Text style={styles.checkTxt}>
                            Steps Walked for Today
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(70,70,70)',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    checkItem: {

        width: '100%',
        // height: '10%',
        borderRadius: 20,
        backgroundColor: 'rgb(30,30,30)',

        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 18,
        marginBottom: 20,
    },
    checkTxt: {
        marginTop: 4,
        color: 'rgb(220,220,220)',
        fontSize: 20,
    },
    checkinTouch: {
        width: '100%',
        padding: 20,
        borderRadius: 20,
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});
