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
import Colors from '../globals/Colors';

export class DailyQuestScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            complete: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            inProgress: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],

            queAnim: new Animated.Value(0),

            takeQOpa: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
            ],

            cntOpacity: new Animated.Value(0),

        }
    }

    componentDidMount() {
        this._startQueAnim();

        this.setState({

        })
    }

    focused = () => {
        this.startCntAnim();
    }

    startCntAnim = () => {
        Animated.timing(this.state.cntOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    _startQueAnim = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.queAnim, {
                    toValue: 0.5,
                    duration: 1000,
                }),
                Animated.timing(this.state.queAnim, {
                    toValue: 0,
                    duration: 1000
                })
            ]),
        ).start()
    };

    takeQuestOnPress = (index) => {
        Animated.timing(this.state.takeQOpa[index], {
            toValue: 0,
            duration: 300,
        }).start(
            () => {
                this.state.inProgress[index] = true;
                this.forceUpdate();
                // this.setState({ inProgress: this.state.inProgress[index] = true, })
            }
        )
    }



    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this.focused} />
                <ScrollView
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                    }}
                    contentContainerStyle={{
                        padding: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Animated.View style={{
                        width: '100%',
                        height: '100%',
                        opacity: this.state.cntOpacity,
                        transform: [
                            {
                                translateY: this.state.cntOpacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-100, 0]
                                })
                            }
                        ]
                    }}>
                        <View style={styles.queCnt}>
                            <View style={styles.questItem}>
                                <Text style={styles.questTxt}>
                                    Take Picture of Your Breakfast
                            </Text>
                            </View>
                            <View style={styles.questBot}>
                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Status:
                                 </Text>
                                    {this.state.complete[0] && !this.state.inProgress[0] &&
                                        <Text style={[styles.questTxt, { color: '#40e0d0' }]}>
                                            {" "}complete
                                    </Text>
                                    }
                                    {!this.state.complete[0] && !this.state.inProgress[0] &&
                                        <Text style={[styles.questTxt, { color: '#ff4500' }]}>
                                            {" "}new
                                    </Text>
                                    }
                                    {this.state.inProgress[0] &&
                                        <Text style={[styles.questTxt, { color: '#00ff00' }]}>
                                            {" "}in progress
                                    </Text>
                                    }
                                </View>

                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Reward:
                                </Text>
                                    <Text style={[styles.questTxt, { color: '#ffd700' }]}>
                                        {" "}50 gold
                                </Text>
                                </View>


                                {!this.state.inProgress[0] &&
                                    <Animated.View style={[styles.takeQuest, {
                                        shadowOpacity: this.state.queAnim,
                                        opacity: this.state.takeQOpa[0],

                                        transform: [
                                            {
                                                translateX: this.state.takeQOpa[0].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [50, 0],
                                                })
                                            },
                                            {
                                                scale: this.state.takeQOpa[0].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [2, 1],
                                                })
                                            }
                                        ]
                                    }]}>

                                        <TouchableOpacity onPress={() => this.takeQuestOnPress(0)} style={styles.checkTouch}>
                                            <MaterialCommunityIcons
                                                color={'black'}
                                                name="check"
                                                size={22}
                                            />
                                        </TouchableOpacity>

                                    </Animated.View>
                                }

                            </View>
                        </View>

                        <View style={styles.queCnt}>
                            <View style={styles.questItem}>
                                <Text style={styles.questTxt}>
                                    Take Picture of Your Lunch
                            </Text>
                            </View>
                            <View style={styles.questBot}>
                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Status:
                                 </Text>
                                    {this.state.complete[1] && !this.state.inProgress[1] &&
                                        <Text style={[styles.questTxt, { color: '#40e0d0' }]}>
                                            {" "}complete
                                    </Text>
                                    }
                                    {!this.state.complete[1] && !this.state.inProgress[1] &&
                                        <Text style={[styles.questTxt, { color: '#ff4500' }]}>
                                            {" "}new
                                    </Text>
                                    }
                                    {this.state.inProgress[1] &&
                                        <Text style={[styles.questTxt, { color: '#00ff00' }]}>
                                            {" "}in progress
                                    </Text>
                                    }
                                </View>

                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Reward:
                                </Text>
                                    <Text style={[styles.questTxt, { color: '#ffd700' }]}>
                                        {" "}50 gold
                                </Text>
                                </View>


                                {!this.state.inProgress[1] &&
                                    <Animated.View style={[styles.takeQuest, {
                                        shadowOpacity: this.state.queAnim,
                                        opacity: this.state.takeQOpa[1],

                                        transform: [
                                            {
                                                translateX: this.state.takeQOpa[1].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [50, 0],
                                                })
                                            },
                                            {
                                                scale: this.state.takeQOpa[1].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [2, 1],
                                                })
                                            }
                                        ]
                                    }]}>

                                        <TouchableOpacity onPress={() => this.takeQuestOnPress(1)} style={styles.checkTouch}>
                                            <MaterialCommunityIcons
                                                color={'black'}
                                                name="check"
                                                size={22}
                                            />
                                        </TouchableOpacity>

                                    </Animated.View>
                                }

                            </View>
                        </View>

                        <View style={styles.queCnt}>
                            <View style={styles.questItem}>
                                <Text style={styles.questTxt}>
                                    Take Picture of Your Dinner
                            </Text>
                            </View>
                            <View style={styles.questBot}>
                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Status:
                                 </Text>
                                    {this.state.complete[2] && !this.state.inProgress[2] &&
                                        <Text style={[styles.questTxt, { color: '#40e0d0' }]}>
                                            {" "}complete
                                    </Text>
                                    }
                                    {!this.state.complete[2] && !this.state.inProgress[2] &&
                                        <Text style={[styles.questTxt, { color: '#ff4500' }]}>
                                            {" "}new
                                    </Text>
                                    }
                                    {this.state.inProgress[2] &&
                                        <Text style={[styles.questTxt, { color: '#00ff00' }]}>
                                            {" "}in progress
                                    </Text>
                                    }
                                </View>

                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Reward:
                                </Text>
                                    <Text style={[styles.questTxt, { color: '#ffd700' }]}>
                                        {" "}50 gold
                                </Text>
                                </View>


                                {!this.state.inProgress[2] &&
                                    <Animated.View style={[styles.takeQuest, {
                                        shadowOpacity: this.state.queAnim,
                                        opacity: this.state.takeQOpa[2],

                                        transform: [
                                            {
                                                translateX: this.state.takeQOpa[2].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [50, 0],
                                                })
                                            },
                                            {
                                                scale: this.state.takeQOpa[2].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [2, 1],
                                                })
                                            }
                                        ]
                                    }]}>

                                        <TouchableOpacity onPress={() => this.takeQuestOnPress(2)} style={styles.checkTouch}>
                                            <MaterialCommunityIcons
                                                color={'black'}
                                                name="check"
                                                size={22}
                                            />
                                        </TouchableOpacity>

                                    </Animated.View>
                                }

                            </View>
                        </View>

                        <View style={styles.queCnt}>
                            <View style={styles.questItem}>
                                <Text style={styles.questTxt}>
                                    Log Your Blood Pressure
                            </Text>
                            </View>
                            <View style={styles.questBot}>
                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Status:
                                 </Text>
                                    {this.state.complete[3] && !this.state.inProgress[3] &&
                                        <Text style={[styles.questTxt, { color: '#40e0d0' }]}>
                                            {" "}complete
                                    </Text>
                                    }
                                    {!this.state.complete[3] && !this.state.inProgress[3] &&
                                        <Text style={[styles.questTxt, { color: '#ff4500' }]}>
                                            {" "}new
                                    </Text>
                                    }
                                    {this.state.inProgress[3] &&
                                        <Text style={[styles.questTxt, { color: '#00ff00' }]}>
                                            {" "}in progress
                                    </Text>
                                    }
                                </View>

                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Reward:
                                </Text>
                                    <Text style={[styles.questTxt, { color: '#ffd700' }]}>
                                        {" "}50 gold
                                </Text>
                                </View>


                                {!this.state.inProgress[3] &&
                                    <Animated.View style={[styles.takeQuest, {
                                        shadowOpacity: this.state.queAnim,
                                        opacity: this.state.takeQOpa[3],

                                        transform: [
                                            {
                                                translateX: this.state.takeQOpa[3].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [50, 0],
                                                })
                                            },
                                            {
                                                scale: this.state.takeQOpa[3].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [2, 1],
                                                })
                                            }
                                        ]
                                    }]}>

                                        <TouchableOpacity onPress={() => this.takeQuestOnPress(3)} style={styles.checkTouch}>
                                            <MaterialCommunityIcons
                                                color={'black'}
                                                name="check"
                                                size={22}
                                            />
                                        </TouchableOpacity>

                                    </Animated.View>
                                }

                            </View>
                        </View>

                        <View style={styles.queCnt}>
                            <View style={styles.questItem}>
                                <Text style={styles.questTxt}>
                                    Log Your Medicine
                            </Text>
                            </View>
                            <View style={styles.questBot}>
                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Status:
                                 </Text>
                                    {this.state.complete[4] && !this.state.inProgress[4] &&
                                        <Text style={[styles.questTxt, { color: '#40e0d0' }]}>
                                            {" "}complete
                                    </Text>
                                    }
                                    {!this.state.complete[4] && !this.state.inProgress[4] &&
                                        <Text style={[styles.questTxt, { color: '#ff4500' }]}>
                                            {" "}new
                                    </Text>
                                    }
                                    {this.state.inProgress[4] &&
                                        <Text style={[styles.questTxt, { color: '#00ff00' }]}>
                                            {" "}in progress
                                    </Text>
                                    }
                                </View>

                                <View style={styles.quesItInline}>
                                    <Text style={styles.questTxt}>
                                        Reward:
                                </Text>
                                    <Text style={[styles.questTxt, { color: '#ffd700' }]}>
                                        {" "}50 gold
                                </Text>
                                </View>


                                {!this.state.inProgress[4] &&
                                    <Animated.View style={[styles.takeQuest, {
                                        shadowOpacity: this.state.queAnim,
                                        opacity: this.state.takeQOpa[4],

                                        transform: [
                                            {
                                                translateX: this.state.takeQOpa[4].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [50, 0],
                                                })
                                            },
                                            {
                                                scale: this.state.takeQOpa[4].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [2, 1],
                                                })
                                            }
                                        ]
                                    }]}>

                                        <TouchableOpacity onPress={() => this.takeQuestOnPress(4)} style={styles.checkTouch}>
                                            <MaterialCommunityIcons
                                                color={'black'}
                                                name="check"
                                                size={22}
                                            />
                                        </TouchableOpacity>

                                    </Animated.View>
                                }

                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(70,70,70)',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    questItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgb(30,30,30)',
        width: '100%',
        padding: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        backgroundColor: Colors.themeColorPrimary,

        shadowColor: Colors.themeShadowColorPrimary,
        shadowOpacity: 0.3,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 18,
    },
    questTxt: {
        color: 'white',
        fontSize: 16,
    },
    queCnt: {
        position: 'relative',
        // height: 140,
        width: '100%',
        backgroundColor: 'rgb(40,40,40)',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 20,


        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 30,

    },
    questBot: {
        width: '100%',

        padding: 20,
    },
    takeQuest: {
        position: 'absolute',
        top: 20,
        right: 20,
        height: '100%',
        aspectRatio: 1,
        backgroundColor: '#ffd700',
        borderRadius: 999,

        shadowColor: '#ffd700',
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 14,
    },
    quesItInline: {
        display: 'flex',
        flexDirection: 'row',
    },
    checkTouch: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 999,
        width: '100%',
        aspectRatio: 1,
    }
});
