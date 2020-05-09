import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player';

// import htn_epart2  from '../../videoAssets/htn_epart2.mp4';

// const video1 = require('../../videoAssets/')
import { LinearGradient } from 'expo-linear-gradient';

import {AppCredit, AppProgress} from '../../globals/appManager';

export class VideoScreen_4 extends React.Component {
    state = {
        correctAns: false,

        answer1: 'incorrect',
        answer2: 'incorrect',
        answer3: 'incorrect',
        answer4: 'incorrect',

    };


    selectQuizAnswer = () => {

    }

    onSubmitAnswers = () => {
        console.log(this.state.answer1 + ' ' + this.state.answer2 + ' ' + this.state.answer3 + ' ')

        let count = 0;

        if (this.state.answer1 === 'correct') {
            count++;
        }
        if (this.state.answer2 === 'correct') {
            count++;

        }
        if (this.state.answer3 === 'correct') {
            count++;
        }
        if (this.state.answer4 === 'correct') {
            count++;
        }

        Alert.alert("You got " + count + " out of 4 answers correct!")
        if (count === 4 && !AppProgress.compP4) {
            AppProgress.incrementProgress();
            AppProgress.completePart4();
        }
    }

    render() {
        return (
            <View style={styles.videoContainer}>
                <Video
                    source={{ uri: 'https://mhealthhypertension.s3.amazonaws.com/htn_epart4.mp4' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    isLooping={false}
                    shouldPlay={true}
                    style={{
                        width: '100%',
                        height: '30%',
                        top: 0,
                        position: "absolute",
                        left: 0,

                    }} useNativeControls={true}
                />
                <View style={styles.sfQuizCnt}>
                    <ScrollView style={styles.quizCnt}>
                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    High BP can be easily checked at clinics or hospitals
                                </Text>
                            </LinearGradient>

                            <Picker
                                itemStyle={styles.quizOptions}
                                style={styles.quizOptionsCnt}
                                selectedValue={this.state.answer1}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ answer1: itemValue })
                                }
                            >
                                <Picker.Item label="Choose an answer..." value="incorrect" />
                                <Picker.Item label="False" value="incorrect1" />
                                <Picker.Item label="True" value="correct" />
                            </Picker>
                        </View>

                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    Which of the following behavior is bad if you already have High BP?
                                </Text>
                            </LinearGradient>

                            <Picker
                                itemStyle={styles.quizOptions}
                                style={styles.quizOptionsCnt}
                                selectedValue={this.state.answer2}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ answer2: itemValue })
                                }
                            >
                                <Picker.Item label="Choose an answer..." value="incorrect" />

                                <Picker.Item label="Getting more exercise" value="incorrect1" />
                                <Picker.Item label="Avoiding salty and fatty food" value="incorrect2" />
                                <Picker.Item label="Avoid eating food" value="correct" />
                                <Picker.Item label="Quit tobacco and alcohol" value="incorrect3" />
                            </Picker>
                        </View>

                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    You need to see doctors regularly when taking High BP treatment medications
                                </Text>
                            </LinearGradient>

                            <Picker
                                itemStyle={styles.quizOptions}
                                style={styles.quizOptionsCnt}
                                selectedValue={this.state.answer3}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ answer3: itemValue })
                                }
                            >
                                <Picker.Item label="Choose an answer..." value="incorrect" />

                                <Picker.Item label="False" value="incorrect1" />
                                <Picker.Item label="True" value="correct" />
                            </Picker>
                        </View>

                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    It is very important to have your blood pressure checked
                                </Text>
                            </LinearGradient>

                            <Picker
                                itemStyle={styles.quizOptions}
                                style={styles.quizOptionsCnt}
                                selectedValue={this.state.answer4}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ answer4: itemValue })
                                }
                            >
                                <Picker.Item label="Choose an answer..." value="incorrect" />
                                <Picker.Item label="False" value="incorrect1" />
                                <Picker.Item label="True" value="correct" />
                            </Picker>
                        </View>
                    </ScrollView>
                    <LinearGradient
                        colors={['#b06ab3', '#4568dc']}>
                        <TouchableOpacity style={styles.confAns} onPress={this.onSubmitAnswers}>
                            <Text style={{ color: "white", fontSize: 20 }}>Confirm Answers</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 10,
    },
    sfQuizCnt: {

        width: '100%',
        top: '30%',
        height: '70%',

        position: "absolute",
    },
    quizCnt: {
        height: '70%',
        width: '100%',
        backgroundColor: 'rgb(30,30,30)',
    },
    quizItemCont: {
     
        aspectRatio: 1,
        width: '100%',
    },
    quizItem: {
        padding: 20,

        fontSize: 20,
        color: 'white',
    },
    quizOptionsCnt: {
        marginTop: 10,
        padding: 0,
        color: 'white',
    },
    quizOptions: {
        color: 'white',

    },
    confAns: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 10,
    }
});