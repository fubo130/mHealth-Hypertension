// src/camera.page.js file
import React from 'react';
import { View, Text, Alert } from 'react-native';
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import { RNS3 } from 'react-native-s3-upload';
import uuid from 'uuid-random'
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';


import styles from './styles';

export class CameraPage extends React.Component {
    camera = null;
    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        photoResponse: []
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        console.log(photoData);

        const { uri: raw_uri } = photoData

        const compressedImage = await ImageManipulator.manipulateAsync(
            raw_uri,
            [{resize: {width: 100, height: 100}}],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        )
        let imageName = uuid() + "image.jpg";
        const { uri: ph_uri } = compressedImage
        const file = {
            uri: ph_uri,
            name: imageName,
            type: "image/jpg"
        }
        const options = {
            keyPrefix: "images/",
            bucket: "hypertest1",
            region: "us-east-1",
            accessKey: "AKIASTVOZVVX43VXVB4S",
            secretKey: "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",
            successActionStatus: 201
          }


        RNS3.put(file, options).progress((e) => console.log(e.loaded / e.total))
        .then(response => {
            axios.post('https://y5k6itv6eg.execute-api.us-east-1.amazonaws.com/test', {
                bucket: 'hypertest1',
                key: imageName
              })
              .then( (response) => {
                let label = JSON.parse(response.data.result)
                let tempPhoto = []

                label.map(entity => {
                    if (entity["Name"] !== 'Fruit' && entity["Name"] !== 'Plant' && entity["Name"] !== 'Food') {
                        tempPhoto.push(entity["Name"])
                    }
                    
                });

                console.log(tempPhoto);

                axios.post('https://w3qgx6u059.execute-api.us-east-1.amazonaws.com/prod', {
                    'labels': tempPhoto
                }).then(response => {
                    console.log(response.data.results)
                    this.showLabel2(response.data.results);
                })
                this.setState({photoResponse: tempPhoto});
                // this.showLabel(this.state.photoResponse);
              })
              .catch(function (error) {
                console.log(error);
              });
            if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
        })
        .catch(err => {console.log(err)});
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    showLabel2(photoResponse) {
        let entities = []
        for (var name in photoResponse) {
            console.log(name)
            if (photoResponse[name] === 'food' || photoResponse[name] === 'fruit' || photoResponse[name] === 'vegetable'){
                entities.push(name);
            }
        }
        Alert.alert(entities.join('\n'));
    }

    showLabel(photoResponse) {
        Alert.alert(photoResponse.join('\n'));
    }

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View style={{
                }}>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    // onCaptureIn={this.handleCaptureIn}
                    // onCaptureOut={this.handleCaptureOut}
                    // onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
                {this.state.photoResponse.length != 0 && 
                    console.log(this.state.photoResponse)

                }
            </React.Fragment>

        );
    };
};