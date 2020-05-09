
import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { VideoButton } from '../customComponents/CustomButtons';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import FastImage from 'react-native-fast-image';

export class FeedScreen extends Component {
    UNSAFE_componentWillMount() {
        this.videoList = (
            <ScrollView style={styles.scrollView}>
                <VideoButton style={styles.img} onPress={() => this.props.navigation.navigate('Video1')} source={require('../imageAssets/01.png')} num={1}>

                </VideoButton>
                <VideoButton style={styles.img} onPress={() => this.props.navigation.navigate('Video2')} source={require('../imageAssets/02.png')} num={2}>

                </VideoButton>
                <VideoButton style={styles.img} onPress={() => this.props.navigation.navigate('Video3')} source={require('../imageAssets/03.png')} num={3}>

                </VideoButton>
                <VideoButton style={styles.img} onPress={() => this.props.navigation.navigate('Video4')} source={require('../imageAssets/04.png')} num={4}>

                </VideoButton>
            </ScrollView>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.videoList}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',

    },
    scrollView: {
        marginTop: 50,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});
