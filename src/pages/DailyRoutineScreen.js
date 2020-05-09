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
import { Pedometer } from 'expo-sensors';
import Credit from '../globals/credit';
import Colors from '../globals/Colors';

let c1 = false;
let c2 = false;
let c3 = false;
let c4 = false;

let c1S = 1;
let c2S = 1;
let c3S = 1;
let c4S = 1;

export class DailyRoutineScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            claimGoldMsg: '',
            isPedometerAvailable: 'checking',
            pastStepCount: 0,
            currentStepCount: 0,

            complete1: c1,
            complete2: c2,
            complete3: c3,
            complete4: c4,

            topOpacity: new Animated.Value(0),
            bottomOpacity: new Animated.Value(0),

            stepCntOpacity: new Animated.Value(0),

            rewardOpacity: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
            ],
            rewardScale: [
                new Animated.Value(c1S),
                new Animated.Value(c2S),
                new Animated.Value(c3S),
                new Animated.Value(c4S),
            ]

        }
    }

    componentDidMount() {
        this._subscribe();

        setInterval(() => {
            c1 = false;
            c2 = false;
            c3 = false;
            c4 = false;

            c1S = 1;
            c2S = 1;
            c3S = 1;
            c4S = 1;

            this.setState({
                complete1: c1,
                complete2: c2,
                complete3: c3,
                complete4: c4,

            })
        }, 86400000);
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    startTopAnimation = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(this.state.topOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.stepCntOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(this.state.bottomOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.rewardOpacity[0], {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.rewardOpacity[1], {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.rewardOpacity[2], {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.rewardOpacity[3], {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

    }


    focused = () => {
        this.startTopAnimation();
    }

    _subscribe = () => {

        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps,
            });

        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result),
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: 'ERROR',
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: 'ERROR',
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };


    claimGold = (steps, gold, complete, index) => {


        if (index === 0) {
            if (!this.state.complete1) {
                if (steps > this.state.pastStepCount) {
                    const temp = steps - this.state.pastStepCount;
                    Alert.alert('You need ' + temp + ' more steps to claim such reward!')
                } else {
                    Alert.alert('Congradulations! You earned ' + gold + ' gold')

                    AppCredit.addCredit(gold);

                    c1 = true;
                    
                    c1S = 0.8
                    Animated.timing(this.state.rewardScale[0], {
                        toValue: c1S,
                        duration: 500,
                        useNativeDriver: true,
                    }).start()

                    this.setState({ complete1: c1 })
                }

            } else {
                Alert.alert('You have already claimed such reward for today!')
            }

        } else if (index === 1) {
            if (!this.state.complete2) {


                if (steps > this.state.pastStepCount) {
                    const temp = steps - this.state.pastStepCount;
                    Alert.alert('You need ' + temp + ' more steps to claim such reward!')
                } else {
                    Alert.alert('Congradulations! You earned ' + gold + ' gold')

                    AppCredit.addCredit(gold);
                    c2 = true;

                    c2S = 0.8
                    Animated.timing(this.state.rewardScale[1], {
                        toValue: c2S,
                        duration: 500,
                        useNativeDriver: true,
                    }).start()

                    this.setState({ complete2: c2 })
                }
            } else {
                Alert.alert('You have already claimed such reward for today!')
            }
        } else if (index === 2) {
            if (!this.state.complete3) {

                if (steps > this.state.pastStepCount) {
                    const temp = steps - this.state.pastStepCount;
                    Alert.alert('You need ' + temp + ' more steps to claim such reward!')
                } else {
                    Alert.alert('Congradulations! You earned ' + gold + ' gold')

                    AppCredit.addCredit(gold);
                    c3 = true;
                    c3S = 0.8
                    Animated.timing(this.state.rewardScale[2], {
                        toValue: c3S,
                        duration: 500,
                        useNativeDriver: true,
                    }).start()

                    this.setState({ complete3: c3 })
                }
            } else {
                Alert.alert('You have already claimed such reward for today!')
            }
        } else {
            if (!this.state.complete4) {

                if (steps > this.state.pastStepCount) {
                    const temp = steps - this.state.pastStepCount;
                    Alert.alert('You need ' + temp + ' more steps to claim such reward!')
                } else {
                    Alert.alert('Congradulations! You earned ' + gold + ' gold')

                    AppCredit.addCredit(gold);
                    c4 = true;
                    c4S = 0.8
                    Animated.timing(this.state.rewardScale[3], {
                        toValue: c4S,
                        duration: 500,
                        useNativeDriver: true,
                    }).start()

                    this.setState({ complete4: c4 })
                }
            } else {
                Alert.alert('You have already claimed such reward for today!')
            }
        }



    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this.focused} />
                <Animated.View style={[styles.topContainer, {
                    opacity: this.state.topOpacity,
                    transform: [
                        {
                            translateY: this.state.topOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-300, 0]
                            })
                        }
                    ]
                }]}>
                    <Text style={{ fontSize: 24, color: 'white', marginBottom: 14 }}>
                        Steps Taken in the Past Day
                </Text>
                    <Animated.View style={[styles.stepsDisplay, {
                        opacity: this.state.stepCntOpacity,

                        transform: [
                            {
                                scale: this.state.stepCntOpacity.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 1.3, 1]
                                })
                            },

                        ]

                    }]}>
                        <Text style={styles.stepsDisplayText}>
                            {this.state.pastStepCount + this.state.currentStepCount}
                        </Text>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={[styles.bottomCnt, {
                    opacity: this.state.bottomOpacity,
                    transform: [
                        {
                            translateY: this.state.bottomOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1000, 0]
                            })
                        }
                    ]
                }]}>
                    <Text style={{ fontSize: 30, color: 'white', marginBottom: 16 }}>
                        Rewards
                    </Text>
                    <Animated.View style={[styles.rewardItem, {
                        opacity: this.state.rewardOpacity[0],
                        transform: [
                            {
                                translateX: this.state.rewardOpacity[0].interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [-1000, 10, 0],
                                })
                            },
                            {
                                scale: this.state.complete1 ? this.state.rewardScale[0] : 1
                            },
                        ],
                        backgroundColor: this.state.complete1 ? 'rgb(0,0,0)' : 'rgb(30,30,30)'
                    }]}>
                        <TouchableOpacity style={styles.rewardTouch} onPress={() => this.claimGold(500, 20, this.state.complete1, 0)}>
                            <Text style={styles.rewardReq}>
                                500 steps for
                            </Text>
                            <Text style={styles.rewardItemText}>
                                20 G
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View style={[styles.rewardItem, {
                        opacity: this.state.rewardOpacity[1],
                        transform: [
                            {
                                translateX: this.state.rewardOpacity[1].interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1000, -10, 0],
                                })
                            },
                            {
                                scale: this.state.complete2 ? this.state.rewardScale[1] : 1
                            },
                        ],
                        backgroundColor: this.state.complete2 ? 'rgb(0,0,0)' : 'rgb(30,30,30)'

                    }]}>
                        <TouchableOpacity style={styles.rewardTouch} onPress={() => this.claimGold(1000, 50, this.state.complete2, 1)}>
                            <Text style={styles.rewardReq}>
                                1000 steps for
                            </Text>
                            <Text style={styles.rewardItemText}>
                                50 G
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View style={[styles.rewardItem, {
                        opacity: this.state.rewardOpacity[2],
                        transform: [
                            {
                                translateX: this.state.rewardOpacity[2].interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [-1000, 10, 0],
                                })
                            },
                            {
                                scale: this.state.complete3 ? this.state.rewardScale[2] : 1
                            },
                        ],
                        backgroundColor: this.state.complete3 ? 'rgb(0,0,0)' : 'rgb(30,30,30)'

                    }]}>
                        <TouchableOpacity style={styles.rewardTouch} onPress={() => this.claimGold(2000, 150, this.state.complete3, 2)}>
                            <Text style={styles.rewardReq}>
                                2000 steps for
                            </Text>
                            <Text style={styles.rewardItemText}>
                                150 G
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View style={[styles.rewardItem, {
                        opacity: this.state.rewardOpacity[3],
                        transform: [
                            {
                                translateX: this.state.rewardOpacity[3].interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1000, -10, 0],
                                })
                            },
                            {
                                scale: this.state.complete4 ? this.state.rewardScale[3] : 1
                            },
                        ],
                        backgroundColor: this.state.complete4 ? 'rgb(0,0,0)' : 'rgb(30,30,30)'

                    }]}>
                        <TouchableOpacity style={styles.rewardTouch} onPress={() => this.claimGold(10000, 1000, this.state.complete4, 3)}>
                            <Text style={styles.rewardReq}>
                                10000 steps for
                            </Text>
                            <Text style={styles.rewardItemText}>
                                1000 G
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>

                </Animated.View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        // height: '100%',
        // width: '100%',
        backgroundColor: 'rgb(70,70,70)',
    },
    stepsDisplay: {
        borderRadius: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgb(70,70,70)',
        width: '26%',
        aspectRatio: 1,

        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 22,
    },
    stepsDisplayText: {
        fontSize: 30,
        color: '#ff4500',
    },
    topContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: Colors.themeColorPrimary,
        position: 'absolute',
        width: '100%',
        height: '36%',
        top: 0,
        borderBottomLeftRadius: 9999,
        borderBottomRightRadius: 9999,

        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 30,

    },
    bottomCnt: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',

        width: '100%',
        height: '64%',
        bottom: 0,
    },
    rewardItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',

        backgroundColor: 'rgb(30,30,30)',
        width: '70%',

        borderRadius: 10,

        margin: 10,

        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 30,
    },
    rewardTouch: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',

        padding: 14,
        borderRadius: 10,
    },
    rewardReq: {
        color: '#ff4500',
        marginRight: 10,
        fontSize: 18,
    },
    rewardItemText: {
        fontSize: 18,
        color: '#ffd700'
    }
});
