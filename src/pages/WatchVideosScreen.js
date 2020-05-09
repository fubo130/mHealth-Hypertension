
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground, View, Dimensions, Animated } from 'react-native';
import Constants from 'expo-constants';
import { VideoButton } from '../customComponents/CustomButtons';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import FastImage from 'react-native-fast-image';
import { findCoordinates } from '../utils/findCoordinate';
import { AppCredit, AppProgress } from '../globals/appManager';


import { Icon } from 'react-native-elements';
import { Feather, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { AppLoading } from 'expo';

import { NavigationEvents } from 'react-navigation';
import Colors from '../globals/Colors';

const img1 = require('../imageAssets/04.jpg');
const img2 = require('../imageAssets/03.jpg')
const img3 = require('../imageAssets/02.jpg')
const img4 = require('../imageAssets/01.jpg')


export class WatchVideosScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldUpdate: false,

            isReady: false,
            lockSecond: true,
            lockThird: true,
            lockLast: true,

            watchOpacity: new Animated.Value(0),

        };

        this.focused = this.focused.bind(this)
    }

    async UNSAFE_componentWillMount() {

        if (AppProgress.learningProgress >= 25) {
            this.setState({ lockSecond: false })
        }
        if (AppProgress.learningProgress >= 50) {
            this.setState({ lockThird: false })

        }
        if (AppProgress.learningProgress >= 75) {
            this.setState({ lockLast: false })
        }

    }

    componentDidMount() {
        this.setState({ isReady: true })
    }

    checkProgress() {
        require('../globals/progress')
    }


    focused() {

        this.forceUpdate();
        this.state.watchOpacity.setValue(0)

        Animated.timing(this.state.watchOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()

        console.log('Updated progress is: ' + AppProgress.learningProgress)
        if (AppProgress.learningProgress >= 25) {
            this.setState({ lockSecond: false })
        }
        if (AppProgress.learningProgress >= 50) {
            this.setState({ lockThird: false })

        }
        if (AppProgress.learningProgress >= 75) {
            this.setState({ lockLast: false })
        }
    }

    blured = () => {
        this.state.watchOpacity.setValue(1)
    }

    render() {

        return (
            <Animated.View style={[styles.container]}>
                <Animated.ScrollView style={[styles.scrollView, {
                    opacity: this.state.watchOpacity,
                    transform: [
                        {
                            scale: this.state.watchOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1]
                            })
                        },
                        {
                            translateY: this.state.watchOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [200, 1]
                            })
                        }
                    ]
                }]}>
                    <NavigationEvents
                        onWillFocus={this.focused}
                        onDidBlur={this.blured}
                    />
                    <VideoButton subTitle={0} disabled={false} style={styles.img} onPress={() => this.props.navigation.navigate('Part 1: Introduction')} source={require('../imageAssets/04.jpg')} label={"Part 1: What is High BP?"}>
                        {AppProgress.learningProgress >= 25 &&
                            <View style={{
                                width: '100%',
                                height: 240,
                                resizeMode: "cover",
                                backgroundColor: 'rgba(255,255,255,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',

                                shadowColor: Colors.themeColorPrimary,
                                shadowOpacity: 1,
                                shadowOffset: { height: 0, width: 0 },
                                shadowRadius: 10,
                            }}>
                                <Feather
                                    color={'white'}
                                    name="check-circle"
                                    size={100}
                                />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    marginTop: 15,
                                    fontWeight: 'bold',




                                }}>
                                    Part 1 completed
                                </Text>
                            </View>
                        }
                    </VideoButton>
                    <VideoButton subTitle={1} disabled={this.state.lockSecond} style={styles.img} onPress={() => this.props.navigation.navigate('Part 2: Causes')} source={require('../imageAssets/03.jpg')} label={"Part 2: What causes High BP?"}>
                        {AppProgress.learningProgress >= 50 &&
                            <View style={{
                                width: '100%',
                                height: 240,
                                resizeMode: "cover",
                                backgroundColor: 'rgba(255,255,255,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',

                                shadowColor:  Colors.themeColorPrimary,
                                shadowOpacity: 1,
                                shadowOffset: { height: 0, width: 0 },
                                shadowRadius: 10,
                            }}>
                                <Feather
                                    color={'white'}
                                    name="check-circle"
                                    size={100}
                                />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    marginTop: 15,
                                    fontWeight: 'bold'
                                }}>
                                    Part 2 completed
                                </Text>
                            </View>
                        }
                    </VideoButton>
                    <VideoButton subTitle={2} disabled={this.state.lockThird} style={styles.img} onPress={() => this.props.navigation.navigate('Part 3: Symptoms')} source={require('../imageAssets/02.jpg')} label={"Part 3: Symptoms of High BP"}>
                        {AppProgress.learningProgress >= 75 &&
                            <View style={{
                                width: '100%',
                                height: 240,
                                resizeMode: "cover",
                                backgroundColor: 'rgba(255,255,255,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',

                                shadowColor:  Colors.themeColorPrimary,
                                shadowOpacity: 1,
                                shadowOffset: { height: 0, width: 0 },
                                shadowRadius: 10,
                            }}>
                                <Feather
                                    color={'white'}
                                    name="check-circle"
                                    size={100}
                                />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    marginTop: 15,
                                    fontWeight: 'bold'
                                }}>
                                    Part 3 completed
                                </Text>
                            </View>
                        }
                    </VideoButton>
                    <VideoButton subTitle={3} disabled={this.state.lockLast} style={styles.img} onPress={() => this.props.navigation.navigate('Part 4: Treatments')} source={require('../imageAssets/01.jpg')} label={"Part 4: Diagnosis of High BP"}>
                        {AppProgress.learningProgress >= 100 &&
                            <View style={{
                                width: '100%',
                                height: 240,
                                resizeMode: "cover",
                                backgroundColor: 'rgba(255,255,255,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',

                                shadowColor: Colors.themeColorPrimary,
                                shadowOpacity: 1,
                                shadowOffset: { height: 0, width: 0 },
                                shadowRadius: 10,
                            }}>
                                <Feather
                                    color={'white'}
                                    name="check-circle"
                                    size={100}
                                />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white',
                                    marginTop: 15,
                                    fontWeight: 'bold'
                                }}>
                                    Part 4 completed
                                </Text>
                            </View>
                        }
                    </VideoButton>
                    <View style={{
                        height: 140,
                        width: '100%'
                    }} />
                </Animated.ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(70,70,70)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scrollView: {
        backgroundColor: 'rgb(70,70,70)',
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 20,
    },
});
