
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ImageBackground, TouchableHighlight, Animated } from 'react-native';
import { MHealthBackBtn, MHealthBtn, PlayBtn, SignInBtn, SignUpBtn, EditProfileBtn, SignOutBtn } from '../customComponents/CustomButtons';
import { colors } from 'react-native-elements';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, Feather, FontAwesome, Foundation } from '@expo/vector-icons';


import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';
import Form from 'react-native-validator-form/lib/Form';
import Colors from './../globals/Colors'
import { NavigationEvents } from 'react-navigation';

export class WelcomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,

            heartScale: new Animated.Value(1),

            screenOpacity: new Animated.Value(0),

        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    toSignIn = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Login');
    }

    toPlay = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('VideoList');
    }

    toSignUp = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('Sign Up');
    }

    toCamera = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('camera');
    }

    UNSAFE_componentWillMount() {
        this.startHeartAnimation();
        this.background = (
            <ImageBackground style={styles.welcomeBackground} resizeMode={'cover'} source={require('../imageAssets/wallpaper.jpg')} >
                <View style={styles.blank} />
            </ImageBackground>
        );
    }

    componentDidMount() {
        Animated.timing(this.state.screenOpacity, {
            delay: 100,
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    startHeartAnimation = () => {
        Animated.loop(Animated.sequence([
            Animated.timing(this.state.heartScale, {
                toValue: 1.2,
                delay: 500,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.heartScale, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.heartScale, {
                toValue: 1.1,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.heartScale, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ])
        ).start()
    }

    focused = () => {
        Animated.timing(this.state.screenOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    blurred = () => {
        this.state.screenOpacity.setValue(0)
    }

    render() {
        const { open } = this.state

        const topBackground = (
            <Animated.View style={{
                width: '100%',
                height: '50%',
                position: 'absolute',
                // backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                top: 0,
            }}>
                <Animated.View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 10,
                    paddingTop: 80
                }}>
                    <MaterialIcons
                        color={Colors.themeColorPrimary}
                        name="directions-walk"
                        size={48}
                    />

                    <MaterialCommunityIcons
                        color={Colors.themeColorPrimary}
                        name="food"
                        size={50}
                    />
                    <MaterialIcons
                        color={Colors.themeColorPrimary}
                        name="smoking-rooms"
                        size={50}
                    />
                </Animated.View>
                <Animated.View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 10,

                    transform: [
                        {
                            scale: this.state.heartScale
                        }
                    ]
                }}>
                    <FontAwesome
                        color={'#ff095a'}
                        name="heartbeat"
                        size={66}
                    />
                </Animated.View>
                <Animated.View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 10,
                }}>
                    <Ionicons
                        color={Colors.themeColorPrimary}
                        name="md-medkit"
                        size={50}
                    />
                    <MaterialCommunityIcons
                        color={Colors.themeColorPrimary}
                        name="doctor"
                        size={48}
                    />
                    <Ionicons
                        color={Colors.themeColorPrimary}
                        name="md-bed"
                        size={58}
                    />
                </Animated.View>

            </Animated.View>

        )


        return (
            <Animated.View style={[styles.welcomeScreenWrapper, {
                backgroundColor: Colors.themeColorPrimary
            }]}>
                <NavigationEvents onWillFocus={this.focused} onWillBlur={this.blurred} />
                {this.background}
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']} style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }} />
                {topBackground}
                <Animated.View
                    isVisible={this.state.isModalVisible}
                    style={[styles.modalStyle, {
                        opacity: this.state.screenOpacity,

                        transform: [
                            {
                                translateY: this.state.screenOpacity.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [50, 0]
                                })
                            }
                        ]
                    }]}
                    animationIn={"slideInUp"}
                    animationInTiming={400}
                    animationOutTiming={500}
                    hasBackdrop={false}
                >
                    <Animated.View style={styles.centerContainer}>
                        <View style={styles.welcomeCont}>
                            <Text style={styles.welcomeTextTitle}>
                                Welcome to mHealth!
                            </Text>
                            <Text style={styles.welcomeText}>
                                Here, you will learn about{"\n"}Hypertension
                            </Text>
                        </View>
                        <PlayBtn title="Sign In" onPress={this.toSignIn} />
                        {/* <SignInBtn title="Sign Up" onPress={this.toSignUp} /> */}
                        <SignInBtn title="Sign Up" onPress={this.toSignUp} />
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    bottomBtn: {
        paddingTop: 50,
        paddingBottom: 50,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: '20%'
    },
    modalStyle: {
        // marginTop: '100%',
        height: '50%',
        bottom: 0,
        position: "absolute",
        width: '100%',
        alignSelf: 'center'
    },
    blank: {
        height: '50%'
    },
    welcomeBackground: {
        zIndex: -1,
        width: '100%',
        height: '100%'
    },
    welcomeScreenWrapper: {
        // marginTop: '25%',
        // backgroundColor: '#242424',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'black',
        // zIndex: 2,
        width: '100%',
        height: '100%',
        // position: 'absolute',
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowOffset: { height: 0, width: 0 },
        // shadowRadius: 5,
    },
    rootImageCont: {
        marginTop: 50,
        marginBottom: 50,
        aspectRatio: 1,
        height: '32%',
        // width: '100%',
        // borderRadius: 100000,
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 5,
    },
    rootImage: {
        width: '100%',
        height: '100%',
        borderRadius: 99999999,
        resizeMode: "cover",
    },
    centerContainer: {
        width: '100%',

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    welcomeText: {
        fontSize: 20,
        // color: '#808080',
        color: 'white',
        // marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    welcomeTextTitle: {
        fontSize: 20,
        // color: '#808080',
        color: 'white',
        // marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    welcomeCont: {
        // marginTop: 10,
        maxWidth: '90%',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    graidientStyle: {
        width: '100%',
        height: '100%',
    }
})