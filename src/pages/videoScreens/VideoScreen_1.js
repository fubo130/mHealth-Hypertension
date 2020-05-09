import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Picker, Alert } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player';

// import htn_epart2  from '../../videoAssets/htn_epart2.mp4';

// const video1 = require('../../videoAssets/')
import { LinearGradient } from 'expo-linear-gradient';


import { AppCredit, AppProgress } from '../../globals/appManager';


export class VideoScreen_1 extends React.Component {


    state = {
        correctAns: false,

        answer1: 'incorrect',
        answer2: 'incorrect',
        answer3: 'incorrect',

        isComplete: false,

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

        Alert.alert("You got " + count + " out of 3 answers correct!")

        if (count === 3 && !AppProgress.compP1) {
            AppProgress.incrementProgress();
            AppProgress.completePart1();
        }
    }

    render() {

        return (
            <View style={styles.videoContainer}>

                <Video
                    source={{ uri: 'https://mhealthhypertension.s3.amazonaws.com/htn_epart1.mp4' }}
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

                    }}
                    useNativeControls={true}
                />
                <View style={styles.sfQuizCnt}>
                    <ScrollView style={styles.quizCnt}>
                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    Smoking tobacco can lead to High BP
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
                                    If a person has High BP, what would his/her blood vessel look like comparing to healthy people?
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
                                <Picker.Item label="It would look wider" value="incorrect1" />
                                <Picker.Item label="It would look narrower" value="correct" />
                            </Picker>
                        </View>

                        <View style={styles.quizItemCont}>
                            <LinearGradient
                                start={[0, 0]}
                                colors={['#2193b0', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671']}>
                                <Text style={styles.quizItem}>
                                    High BP makes your heart harder to pump blood though your organs
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