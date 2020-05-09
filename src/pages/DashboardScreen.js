import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, SafeAreaView, ScrollView, Animated, ImageBackground, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { writeToCache, readFromCache, deleteItem } from './../localCache/LocalCache';
import { LinearGradient } from 'expo-linear-gradient';
import { MHealthBackBtn, MHealthBtn, PlayBtn, SignInBtn, SignUpBtn, EditProfileBtn } from '../customComponents/CustomButtons';
import { AppCredit, AppProgress } from '../globals/appManager';
import { NavigationEvents } from 'react-navigation';

import { Entypo, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../globals/Colors';


const SignOutBtn = (props) => {
  const { title = {}, style = {}, textStyle = {}, onPress } = props;

  return (
    <TouchableOpacity title={title} onPress={onPress} style={[styles.signOutCont, style]}>
      <Text style={[styles.signOutText, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};


export class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.focused = this.focused.bind(this)

    this.state = {
      progressShaAnim: new Animated.Value(0),
      progressSizeAnim: new Animated.Value(40),
      completeAnim: new Animated.Value(0),

      topTranslateY: new Animated.Value(-200),

      topOpacity: new Animated.Value(0),

    }
  }

  _startProgressAnim = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.progressShaAnim, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(this.state.progressShaAnim, {
          toValue: 0,
          duration: 1000
        })
      ]),
    ).start()
  };

  _startProgressAnim2 = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.progressSizeAnim, {
          toValue: 44,
          duration: 1000,
        }),
        Animated.timing(this.state.progressSizeAnim, {
          toValue: 40,
          duration: 1000
        })
      ]),
    ).start()
  };

  startHeaderAnimation = () => {
    this.state.topOpacity.setValue(0)
    Animated.timing(this.state.topOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  navigateToHome() {
    this.props.navigation.navigate('mHealth');
  }

  async signOut() {
    Auth.signOut({ global: true })
      .then(async () => {
        await deleteItem("user_id");
        await deleteItem("idToken");
      })
      .catch(err => console.log(err));


    this.navigateToHome();
  }

  focused() {
    this.forceUpdate();
    this.startHeaderAnimation();
  }

  blured = () => {
    this.state.topOpacity.setValue(1)
  }

  componentDidMount() {
    this._startProgressAnim();
    this._startProgressAnim2();
  }

  progressStatus() {
    if (AppProgress.learningProgress === 100) {
      Alert.alert("Congratulations! You have learned about Hypertension!")
    }
    if (AppProgress.learningProgress === 75) {
      Alert.alert("You have completed the thrid part, only one to go!")
    }
    if (AppProgress.learningProgress === 50) {
      Alert.alert("You have completed the second part, you are half way there!")
    }
    if (AppProgress.learningProgress === 25) {
      Alert.alert("You have completed the first part, please continue learning!")
    }
    if (AppProgress.learningProgress === 0) {
      Alert.alert("Select the beginning tab at the bottom to learn about Hypertension!")
    }
  }


  render() {



    return (
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(70,70,70)',

      }}>
        <NavigationEvents onWillFocus={this.focused} onDidBlur={this.blured} />
        <Animated.View onPress={this.progressStatus} style={[styles.headerWrapper, {
          opacity: this.state.topOpacity,

          transform: [
            {
              translateY: this.state.topOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 0],
                // useNativeDriver: true,
              }),
            }
          ]
        }]}>
          <Animated.View style={{
            position: 'relative',
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            textAlign: 'center',
            height: '80%',
            aspectRatio: 1,
            // borderRadius: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0.5)',


            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowOffset: { height: 10, width: 0 },
            shadowRadius: 18,

          }}
          >

            <TouchableOpacity style={{

              aspectRatio: 1,
              height: '100%',
              display: "flex",
              alignItems: "center",
              justifyContent: 'center',
              textAlign: 'center',
              position: 'absolute',
              top: 0,
              left: 0,

            }} onPress={this.progressStatus} >

              <Animated.View style={{
                // borderTopLeftRadius: 20,

                // backgroundColor: 'white',
                aspectRatio: 1,
                height: '48%',
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: 0,
                left: 0,

              }}>
                <ImageBackground source={require('../imageAssets/04.jpg')} style={{
                  width: '100%', height: '100%', resizeMode: "cover",

                }} >
                  {AppProgress.learningProgress < 25 &&
                    <Animated.View style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      width: '100%',
                      height: '100%'
                    }}>
                    </Animated.View>
                  }
                  {AppProgress.learningProgress >= 25 &&
                    <Animated.View style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: Colors.themeColorPrimary,
                      opacity: this.state.completeAnim,

                    }}>
                    </Animated.View>
                  }
                </ImageBackground>
              </Animated.View>

              <Animated.View style={{
                // borderTopRightRadius: 20,

                backgroundColor: 'green',
                aspectRatio: 1,
                height: '48%',
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: 0,
                left: '52%',

              }}>

                <ImageBackground source={require('../imageAssets/03.jpg')} style={{
                  width: '100%', height: '100%', resizeMode: "cover"

                }} >

                  {AppProgress.learningProgress < 50 &&
                    <Animated.View style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      width: '100%',
                      height: '100%'
                    }}>
                    </Animated.View>
                  }
                  {AppProgress.learningProgress >= 50 &&
                    <Animated.View style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor:  Colors.themeColorPrimary,
                      opacity: this.state.completeAnim,
                    }}>
                    </Animated.View>
                  }
                </ImageBackground>
              </Animated.View>

              <Animated.View style={{
                // borderBottomLeftRadius: 20,

                backgroundColor: 'black',
                aspectRatio: 1,
                height: '48%',
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: '52%',
                left: 0,

              }}>
                <ImageBackground source={require('../imageAssets/02.jpg')} style={{
                  width: '100%', height: '100%', resizeMode: "cover"

                }} >
                  {AppProgress.learningProgress < 75 &&
                    <Animated.View style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      width: '100%',
                      height: '100%'
                    }}>
                    </Animated.View>
                  }
                  {AppProgress.learningProgress >= 75 &&
                    <Animated.View style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: Colors.themeColorPrimary,
                      opacity: this.state.completeAnim,
                    }}>
                    </Animated.View>
                  }
                </ImageBackground>

              </Animated.View>


              <Animated.View style={{
                // borderBottomRightRadius: 20,

                backgroundColor: 'pink',
                aspectRatio: 1,
                height: '48%',
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                textAlign: 'center',
                position: 'absolute',
                top: '52%',
                left: '52%',

              }}>

                <ImageBackground source={require('../imageAssets/01.jpg')} style={{
                  width: '100%', height: '100%', resizeMode: "cover"

                }} >

                  {AppProgress.learningProgress < 100 &&
                    <Animated.View style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      width: '100%',
                      height: '100%'
                    }}>
                    </Animated.View>
                  }
                  {AppProgress.learningProgress >= 100 &&
                    <Animated.View style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor:  Colors.themeColorPrimary,
                      opacity: this.state.completeAnim,
                    }}>
                    </Animated.View>
                  }
                </ImageBackground>
              </Animated.View>


              <Animated.View style={{
                backgroundColor: 'rgba(70,70,70,0.9)',
                aspectRatio: 1,
                borderRadius: 999,
                height: this.state.progressSizeAnim,
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                textAlign: 'center',

                shadowColor: Colors.themeShadowColorPrimary,
                shadowOpacity: this.state.progressShaAnim,
                shadowOffset: { height: 0, width: 0 },
                shadowRadius: 18,
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 13,
                }}>
                  {AppProgress.learningProgress}%
              </Text>

              </Animated.View>
            </TouchableOpacity>

          </Animated.View>

        </Animated.View>

        <Animated.View style={[styles.viewCont, {
          opacity: this.state.topOpacity,

          transform: [
            {
              translateY: this.state.topOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
                // useNativeDriver: true,
              })
            },

          ]
        }]}>


          <Animated.View style={{
            borderRadius: 14,
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowOffset: { height: 10, width: 0 },
            shadowRadius: 10,

            backgroundColor: 'rgb(50,50,50)',
            aspectRatio: 1,
            height: '46%',
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Check In')} style={styles.dashBtn}>

              <MaterialCommunityIcons
                color={ Colors.themeColorPrimary}
                name="playlist-check"
                size={38}
              />
              <Text style={{
                color: 'white',
                fontSize: 14,
                marginTop: 4
              }}>
                Check In
            </Text>

            </TouchableOpacity>



          </Animated.View>

          <Animated.View style={{
            borderRadius: 14,
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowOffset: { height: 10, width: 0 },
            shadowRadius: 10,


            backgroundColor: 'rgb(50,50,50)',
            aspectRatio: 1,
            height: '46%',
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Quests')} style={styles.dashBtn}>

              <MaterialCommunityIcons

                color={ Colors.themeColorPrimary}
                name="calendar-question"
                size={38}
              />
              <Text style={{
                color: 'white',
                fontSize: 14,
                marginTop: 4
              }}>
                Daily Quests
            </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{
            borderRadius: 14,
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowOffset: { height: 10, width: 0 },
            shadowRadius: 10,


            backgroundColor: 'rgb(50,50,50)',
            aspectRatio: 1,
            height: '46%',
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Your Achievements')} style={styles.dashBtn}>

              <Entypo
                color={ Colors.themeColorPrimary}
                name="star-outlined"
                size={38}
              />
              <Text style={{
                color: 'white',
                fontSize: 14,
                marginTop: 4
              }}>
                Achievements
            </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{
            borderRadius: 14,
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowOffset: { height: 10, width: 0 },
            shadowRadius: 10,


            backgroundColor: 'rgb(50,50,50)',
            aspectRatio: 1,
            height: '46%',
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Information')} style={styles.dashBtn}>

              <Ionicons
                color={ Colors.themeColorPrimary}
                name="md-information-circle-outline"
                size={38}
              />
              <Text style={{
                color: 'white',
                fontSize: 14,
                marginTop: 4
              }}>
                Information
            </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* <View style={{
            height: 110,
            width: '100%'
          }} /> */}

        </Animated.View>
        <Animated.View style={{
          flex: 1,
          alignItems:'center',
          textAlign: 'center',
          justifyContent:'center',
          backgroundColor:'red',

          opacity: this.state.topOpacity,

          transform: [
            {
              scale: this.state.topOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                // useNativeDriver: true,
              })
            }
          ]

        }}>
          <SignOutBtn title={"Sign Out"} onPress={this.signOut} />
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  dashBtn: {
    aspectRatio: 1,
    height: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
  },
  viewCont: {
    position: 'relative',
    top: '38%',
    // backgroundColor: 'black',
    height: '38%',
    aspectRatio: 1,
    // left: 0,
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileFields: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    minWidth: '100%',
    backgroundColor: 'white',
    borderColor: 'rgb(235,235,235)',
    alignItems: "center"
  },
  profileFieldText: {
    fontSize: 16,
  },
  btnCont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  Colors.themeColorPrimary,
    height: '15%',
    width: '100%',
    bottom: 0,
    position: "absolute"
    // marginTop: 0,
    // marginTop: 100,
    // marginBottom: 50

  },
  listCont: {
    height: '65%',

  },
  listStyle: {
    borderTopWidth: 1,
    borderColor: 'rgb(235,235,235)',
  },

  bodyWrapper: {
    // flex: 2,
    backgroundColor: 'black',
    height: '50%',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
  },
  userName: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 20,
    color: 'white',
  },
  location: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
    color: 'white',
  },
  headerWrapper: {
    height: '35%',
    // flex: 1,
    width: '100%',
    backgroundColor:  Colors.themeColorPrimary,
    alignItems: 'center',
    // padding: 20,
    top: 0,
    position: "absolute",
    justifyContent: "center",
    // borderBottomLeftRadius: 9999,
    // borderBottomRightRadius: 9999,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 15,

  },
  avatarContStyle: {
    height: 100,
    aspectRatio: 1,
    backgroundColor: 'black'
  },
  avatarStyle: {
    height: 100,
    aspectRatio: 1,
    // color: 'black',
    // backgroundColor: 'black',
    borderRadius: 999,
  },
  signOutCont: {
    display: 'flex',
    minHeight: '13%',
    minWidth: '100%',
    padding: 18,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,

    // backgroundColor: 'rgb(100,70,70)',
  },

  signOutText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase'
  },
});