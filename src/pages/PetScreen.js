import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Animated, Alert, Platform } from 'react-native';
import Animation from './pet/Animation';
import Pet from './pet/Pet'
import { Asset } from 'expo-asset';
import { Video } from 'expo-av';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppCredit, AppProgress } from '../globals/appManager';
import Colors from '../globals/Colors';

export const MyPet = new Pet('Bob');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export class PetScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fullnessStatus: MyPet.fullness,
      cleanlinessStatus: MyPet.cleanliness,
      fitnessStatus: MyPet.fitness,

      petStatus: MyPet.status,
      newPetStatus: MyPet.status,

      goldStatus: AppCredit.totalCredits,

      petOpacity: new Animated.Value(0),

      playScale: new Animated.Value(1),
      feedScale: new Animated.Value(1),
      cleanScale: new Animated.Value(1),
    }

    this.focused = this.focused.bind(this);
    this.pressPlay = this.pressPlay.bind(this);
    this.pressFeed = this.pressFeed.bind(this);
    this.pressClean = this.pressClean.bind(this);
    this.pressRevive = this.pressRevive.bind(this);
    this.setPetState = this.setPetState.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.petOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()


    setInterval(
      () => {
        MyPet.dayPass();

        // this.forceUpdate();

        this.setState({
          newPetStatus: MyPet.getCurrentStatus(),
          petStatus: MyPet.getCurrentStatus(),
          fullnessStatus: MyPet.fullness,
          cleanlinessStatus: MyPet.cleanliness,
          fitnessStatus: MyPet.fitness,

        })
      },
      100000);

    // setInterval(() => {
    //   this.setState({
    //     goldStatus: AppCredit.totalCredits,
    //   })
    // }, 1000);
  }




  focused() {

    this.forceUpdate();

    console.log('pet focused')

    this.state.petOpacity.setValue(0);

    Animated.timing(this.state.petOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()


    this.setState({
      newPetStatus: MyPet.getCurrentStatus(),
      petStatus: MyPet.getCurrentStatus(),
      fullnessStatus: MyPet.fullness,
      cleanlinessStatus: MyPet.cleanliness,
      fitnessStatus: MyPet.fitness,

      goldStatus: AppCredit.totalCredits,
    })
  }

  blured = () => {
    this.state.petOpacity.setValue(1);
  }


  setPetState() {
    this.setState({
      newPetStatus: MyPet.newStatus,
      petStatus: MyPet.status,
      fullnessStatus: MyPet.fullness,
      cleanlinessStatus: MyPet.cleanliness,
      fitnessStatus: MyPet.fitness,

      goldStatus: AppCredit.totalCredits,
    })

  }


  pressPlay() {

    Animated.sequence([
      Animated.timing(this.state.playScale, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.playScale, {
        toValue: 0.9,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.playScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      
      Animated.timing(this.state.playScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start()

    if (AppCredit.totalCredits >= 10) {
      AppCredit.reduceCredit(10);
      MyPet.play();
      MyPet.updatePetStatus()
    } else {
      Alert.alert("Not enough credit")
    }
    this.forceUpdate();

    this.setPetState();
  }

  pressFeed() {
   
    Animated.sequence([
      Animated.timing(this.state.feedScale, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.feedScale, {
        toValue: 0.9,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.feedScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      
      Animated.timing(this.state.feedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start()

    if (AppCredit.totalCredits >= 40) {

      MyPet.feed();
      MyPet.updatePetStatus()
      AppCredit.reduceCredit(40);
    } else {
      Alert.alert("Not enough credit")

    }

    this.forceUpdate();

    this.setPetState();

  }

  pressClean() {
    
    Animated.sequence([
      Animated.timing(this.state.cleanScale, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.cleanScale, {
        toValue: 0.9,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.cleanScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      
      Animated.timing(this.state.cleanScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start()

    if (AppCredit.totalCredits >= 30) {

      MyPet.clean();
      MyPet.updatePetStatus()
      AppCredit.reduceCredit(30);
    } else {
      Alert.alert("Not enough credit")

    }

    this.forceUpdate();

    this.setPetState();

  }

  pressRevive() {
    if (AppCredit.totalCredits >= 200) {

      MyPet.revive();
      MyPet.updatePetStatus()
      AppCredit.reduceCredit(200);
    } else {
      Alert.alert("Not enough credit")

    }
    this.forceUpdate();

    this.setPetState();
  }


  render() {



    return (
      <Animated.View style={[styles.container, {

      }]}>
        <NavigationEvents onWillFocus={this.focused} onDidBlur={this.blured} />

        <Animated.View style={[styles.petDash, {
          opacity: this.state.petOpacity,
          transform: [
            {
              translateY: this.state.petOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-screenHeight / 2, 0]
              })
            }
          ]

        }]}>
          <Animation
            prevAnimation={this.state.newPetStatus}
            animationName={this.state.petStatus}
          >
          </Animation>
          <View style={styles.petStatusBar}>
            <Text style={styles.petBarTextS}>
              Status: {this.state.newPetStatus}
            </Text>
          </View>

          <View style={styles.petStatusBarA}>
            <Animated.View style={{
              width: this.state.fullnessStatus.toString().concat('%'),
              height: '100%',

              padding: 4,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.7)',
              position: 'relative'
            }}>
            </Animated.View>
            <Text style={styles.petBarText}>
              Fullness: {MyPet.fullness}
            </Text>
          </View>
          <View style={styles.petStatusBarB}>
            <Animated.View style={{
              width: this.state.cleanlinessStatus.toString().concat('%'),
              height: '100%',

              padding: 4,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.7)',
              position: 'relative'
            }}>

            </Animated.View>
            <Text style={styles.petBarText}>
              Cleanliness: {MyPet.cleanliness}
            </Text>
          </View>
          <View style={styles.petStatusBarC}>
            <Animated.View style={{
              width: this.state.fitnessStatus.toString().concat('%'),
              height: '100%',

              padding: 4,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.7)',
              position: 'relative'
            }}>

            </Animated.View>
            <Text style={styles.petBarText}>
              Fitness: {MyPet.fitness}
            </Text>
          </View>
        </Animated.View>
        {MyPet.isAlive &&
          <Animated.View style={[styles.petActPane, {
            opacity: this.state.petOpacity,
            transform: [
              {
                scale: this.state.petOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]
          }]}>
            <Text style={{

              color: '#ffd700',
              fontSize: 20,
              marginBottom: 30,
              shadowColor: '#ffd700',
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              shadowRadius: 20,
            }}>
              Gold: {this.state.goldStatus}
            </Text>
            <Animated.View style={[styles.petActItem, {
              transform: [
                {
                  scale: this.state.playScale
                }
              ]
            }]}>
              <TouchableOpacity onPress={this.pressPlay} style={styles.petActItemCnt}>
                <Text style={styles.petActText}>
                  Play with {MyPet.name}
                </Text>
              </TouchableOpacity>

              <View style={styles.creditCnt}>
                <Text style={styles.creditTxt}>
                  10
              </Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.petActItem, {
              transform: [
                {
                  scale: this.state.feedScale
                }
              ]
            }]}>
              <TouchableOpacity onPress={this.pressFeed} style={styles.petActItemCnt}>
                <Text style={styles.petActText}>
                  Feed {MyPet.name}
                </Text>
              </TouchableOpacity>

              <View style={styles.creditCnt}>
                <Text style={styles.creditTxt}>
                  40
              </Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.petActItem, {
              transform: [
                {
                  scale: this.state.cleanScale
                }
              ]
            }]}>
              <TouchableOpacity onPress={this.pressClean} style={styles.petActItemCnt}>
                <Text style={styles.petActText}>
                  Clean {MyPet.name}
                </Text>
              </TouchableOpacity>

              <View style={styles.creditCnt}>
                <Text style={styles.creditTxt}>
                  30
              </Text>
              </View>
            </Animated.View>

          </Animated.View>
        }
        {!MyPet.isAlive &&
          <View style={styles.petActPane}>
            <Text style={{

              color: '#ffd700',
              fontSize: 20,
              marginBottom: 30,
              shadowColor: '#ffd700',
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              shadowRadius: 20,
            }}>
              Gold: {this.state.goldStatus}
            </Text>

            <View style={styles.petActItemR}>
              <TouchableOpacity onPress={this.pressRevive} style={styles.petActItemCntR}>
                <Text style={styles.petActText}>
                  Revive {MyPet.name}
                </Text>
              </TouchableOpacity>

              <View style={styles.creditCnt}>
                <Text style={styles.creditTxt}>
                  200
                </Text>
              </View>
            </View>
          </View>
        }
      </Animated.View>
    );
  }
}


//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(70,70,70)',
  },
  petDash: {

    width: '100%',
    // paddingBottom: 20,
    height: screenHeight / 2.5,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: Colors.themeColorPrimary,

  },
  petStatusBar: {
    display: 'flex',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    width: '36%',
    padding: 10,

    borderRadius: 999,
    backgroundColor: 'rgb(50,50,50)',
    marginBottom: 6,


    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),

  },
  petBarTextS: {
    color: 'white',
    fontSize: 13,
  },
  petStatusBarA: {
    position: 'relative',
    width: '80%',
    height: 20,
    borderRadius: 999,
    backgroundColor: '#ff1493',
    margin: 6,

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  petStatusBarB: {
    position: 'relative',
    height: 20,

    width: '80%',
    borderRadius: 999,
    backgroundColor: '#00ff00',
    margin: 6,

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  petStatusBarC: {
    position: 'relative',
    height: 20,

    width: '80%',
    borderRadius: 999,
    backgroundColor: '#00bfff',
    margin: 6,

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  petBarText: {
    color: 'black',
    fontSize: 13,
    position: 'absolute',
    top: 2,
    left: 10,
  },
  petActPane: {
    width: '100%',
    marginBottom: '10%',
    // paddingBottom: 100,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // backgroundColor: 'red'
  },

  petActItemCntR: {
    minWidth: '60%',
    minHeight: '24%',

    position: 'relative',
  },
  petActItemR: {

    position: 'relative',
    display: 'flex',
    paddingLeft: 10,

    justifyContent: "center",

    backgroundColor: 'rgb(50,50,50)',
    marginBottom: 16,
    borderRadius: 10,

    ...Platform.select({
      ios: {

        shadowColor: Colors.themeShadowColorPrimary,
        shadowOpacity: 0.2,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),

  },

  petActItemCnt: {
    minWidth: '60%',
    minHeight: '13%',

    position: 'relative',
  },
  petActItem: {

    position: 'relative',
    display: 'flex',
    paddingLeft: 10,

    justifyContent: "center",

    backgroundColor: 'rgb(50,50,50)',
    marginBottom: 16,
    borderRadius: 10,

    ...Platform.select({
      ios: {

        shadowColor: Colors.themeShadowColorPrimary,
        shadowOpacity: 0.2,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 20,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  petActText: {
    color: 'white',
    fontSize: 14,
  },
  creditCnt: {

    aspectRatio: 1,
    position: 'absolute',
    right: 0,
    top: 0,

    height: '100%',
    // width: '35%',

    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: '#ffd700',
    borderRadius: 5,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,

    ...Platform.select({
      ios: {

        shadowColor: '#ffd700',
        shadowOpacity: 0.9,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 12,
      },
      android: {
        elevation: 20,
      },
    }),

    shadowColor: '#ffd700',
    shadowOpacity: 0.9,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 12,
  },
  creditTxt: {
    color: 'black',
    fontSize: 14
  }
});
