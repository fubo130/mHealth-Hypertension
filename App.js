import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Platform, Alert, Animated } from 'react-native';
import { createAppContainer, createSwitchNavigator, CreateNavigatorConfig, NavigationStackRouterConfig, NavigationRoute } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
  TransitionPresets, createStackNavigator, HeaderBackButton, useCardAnimation, useHeaderHeight, Header
} from 'react-navigation-stack'
import { PlayGamesScreen } from "./src/pages/PlayGamesScreen";
import { Login } from './src/pages/LoginScreen';
import { PetScreen } from './src/pages/PetScreen';
import { ProfileScreen } from './src/pages/DashboardScreen';
import { WatchVideosScreen } from './src/pages/WatchVideosScreen';
import { WelcomeScreen } from './src/pages/WelcomeScreen';
import { SignUpScreen } from './src/pages/SignUpScreen';
import { WelcomeButton } from './src/customComponents/CustomButtons';
import { BackButton } from './src/customComponents/CustomButtons';
import { VideoScreen_1 } from './src/pages/videoScreens/VideoScreen_1';
import { VideoScreen_2 } from './src/pages/videoScreens/VideoScreen_2';
import { VideoScreen_3 } from './src/pages/videoScreens/VideoScreen_3';
import { VideoScreen_4 } from './src/pages/videoScreens/VideoScreen_4';
import { CameraPage } from './src/camera/camera.page';
import { DailyRoutineScreen } from './src/pages/DailyRoutineScreen';
import { DailyQuestScreen } from './src/pages/DailyQuestScreen';
import { InformationScreen } from './src/pages/InformationScreen';
import { AchievementScreen } from './src/pages/AchievementScreen';
import { BloodPressure } from './src/pages/BloodPressureScreen';
import { MedicineLog } from './src/pages/MedicineLog'

import Amplify from 'aws-amplify';
import config from './config';

import { Ionicons, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { Icon } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { fromBottom } from 'react-navigation-transitions';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Spinner from 'react-native-loading-spinner-overlay';
import {findCoordinates} from './src/utils/findCoordinate'
import { MyPet } from './src/pages/PetScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DailyCheckinScreen } from './src/pages/DailyCheckInScreen';
import Colors from './src/globals/Colors';


const Auth = {
  mandatorySignId: true,
  region: config.cognito.REGION,
  userPoolId: config.cognito.USER_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID
}
Amplify.configure(
  Auth
);

findCoordinates()

console.log(Auth);

// import AppSwitchNavigator from './src/pages/navigators/AppSwitchNavigator';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: 0,
      isReady: false,
      spinner: false,

    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/imageAssets/04.jpg'),
      require('./src/imageAssets/03.jpg'),
      require('./src/imageAssets/02.jpg'),
      require('./src/imageAssets/01.jpg'),
      require('./src/imageAssets/wallpaper.jpg'),
      require('./src/pages/game1/img/apple.jpg'),
      require('./src/pages/game1/img/apricot.jpg'),
      require('./src/pages/game1/img/back.png'),
      require('./src/pages/game1/img/correct.png'),
      require('./src/pages/game1/img/milker_X_icon.png'),
      require('./src/pages/game1/img/salt.jpg'),
      require('./src/pages/game1/img/pineapple.png'),
      require('./src/pages/game1/img/popeyes.png'),
      require('./src/pages/game1/img/alcohol.png'),
      require('./src/pages/game1/img/bpTest.png'),
      require('./src/pages/game1/img/late.png'),
      require('./src/pages/game1/img/lie.png'),
      require('./src/pages/game1/img/run.png'),
      require('./src/pages/game1/img/smoke.png'),
      require('./src/pages/game1/img/workout.png'),
      require('./src/pages/game1/img/burger.jpg'),
    ]);

    await Promise.all([...imageAssets]);

  }

  getHeaderHeight = () => {
    this.headerHeight = useHeaderHeight();
  }


  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        >
          <View style={styles.appContainer}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={{
                color: 'black',
                fontSize: 20
              }}
            />
          </View>
        </AppLoading>
      );
    }
    return (
      <View style={styles.appContainer}>
        <AppContainer />
      </View>
    );
  }
}

const tab1 = new Animated.Value(1);
const tab2 = new Animated.Value(1);
const tab3 = new Animated.Value(1);
const tab4 = new Animated.Value(1);

function tabAnimation(tab) {
  Animated.sequence([
    Animated.parallel([
      Animated.timing(tab, {
        toValue: 1.2,
        duration: 80,
        useNativeDriver: true,
      }),
   
    ]),
    Animated.parallel([
      Animated.timing(tab, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
   
    ]),
  ]).start()
}


export const DashboardTabNavigator = createBottomTabNavigator(
  {


    'Watch': {
      screen: WatchVideosScreen,

      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Animated.View style={[styles.tabbarIcon, {
            // backgroundColor: activeTintColor,

            transform: [
              {
                scale: tab1
                
              },
              {
                translateY: tab1.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0, -10]
                })
              }
            ]
          }]}>
            <TouchableOpacity onPress={() => tabAnimation(tab1)} style={styles.tabbarTouch}>
              <Feather
                color={tintColor}
                name="play"
                size={28}
              />
            </TouchableOpacity>
          </Animated.View>
        )
      },
    },
    'Play': {
      screen: PlayGamesScreen,

      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Animated.View style={[styles.tabbarIcon, {
            transform: [
              {
                scale: tab2
              },
              
              {
                translateY: tab2.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0, -10]
                })
              }
            ]
          }]}>
            <TouchableOpacity onPress={() => tabAnimation(tab2)} style={styles.tabbarTouch}>
              <Ionicons
                color={tintColor}
                name="logo-game-controller-b"
                size={28}
              />
            </TouchableOpacity>
          </Animated.View>
        )
      },
    },
    'My Pet':
    {
      screen: PetScreen,

      navigationOptions: {
        title: 'shit',

        tabBarLabel: ({ tintColor }) => (
          <Animated.View style={[styles.tabbarIcon, {
            transform: [
              {
                scale: tab3
              },
              {
                translateY: tab3.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0, -10]
                })
              }
            ]
          }]}>
            <TouchableOpacity onPress={() => tabAnimation(tab3)} style={styles.tabbarTouch}>

              <Icon
                color={tintColor}
                name="child-care"
                size={28}
              />
            </TouchableOpacity>
          </Animated.View>
        )
      },
    },
    'My Dashboard': {
      screen: ProfileScreen,

      navigationOptions: {

        tabBarLabel: ({ tintColor }) => (
          <Animated.View style={[styles.tabbarIcon, {
            transform: [
              {
                scale: tab4
              },
              {
                translateY: tab4.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0, -10]
                })
              }
            ]
          }]}>
            <TouchableOpacity onPress={() => tabAnimation(tab4)} style={styles.tabbarTouch}>

              <MaterialCommunityIcons
                color={tintColor}
                name="account"
                size={28}
              />
            </TouchableOpacity>
          </Animated.View>
        )
      },
    },
  },

  {

    initialRouteName: 'My Dashboard',

    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },

    

    tabBarOptions: {

      showLabel: true,
      activeTintColor: Colors.themeColorPrimary,
      inactiveTintColor: 'rgb(230,230,230)',

      tabStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },


      style: {
      
        position: "absolute",
        bottom: 0,
      
        borderTopColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(70,70,70, 0.8)',
        borderTopWidth: 1,
        // paddingTop: 10,
        height: 60,
    
      }
    }
  },

);

export const DashboardStackNavigator = createStackNavigator(
  {

    // mHealth: WelcomeScreen,
    VideoList: DashboardTabNavigator,


    'Part 1: Introduction': {
      screen: VideoScreen_1,

      navigationOptions: {
        headerBackground: () => <LinearGradient colors={['#4568dc', '#b06ab3']} style={[StyleSheet.absoluteFill]}
        ></LinearGradient>,
      },
    },
    'Part 2: Causes': {
      screen: VideoScreen_2,

      navigationOptions: {
        headerBackground: () => <LinearGradient colors={['#4568dc', '#b06ab3']} style={[StyleSheet.absoluteFill]}
        ></LinearGradient>,
      },
    },
    'Part 3: Symptoms': {
      screen: VideoScreen_3,

      navigationOptions: {
        headerBackground: () => <LinearGradient colors={['#4568dc', '#b06ab3']} style={[StyleSheet.absoluteFill]}
        ></LinearGradient>,
      },
    },
    'Part 4: Treatments': {
      screen: VideoScreen_4,

      navigationOptions: {
        headerBackground: () => <LinearGradient colors={['#4568dc', '#b06ab3']} style={[StyleSheet.absoluteFill]}
        ></LinearGradient>,
      },
    },
    'Log Your Meal': {
      screen: CameraPage,
    },

    'Your Achievements': {
      screen: AchievementScreen,
    },

    'My Information': {
      screen: InformationScreen,
    },

    'My Routine': {
      screen: DailyRoutineScreen,
    },

    'Quests': {
      screen: DailyQuestScreen,
    },

    'Check In': {
      screen: DailyCheckinScreen,
    },

    'Blood Pressure': {
      screen: BloodPressure,
    },

    'Medicine Log': {
      screen: MedicineLog,
    }

  },
  {

    defaultNavigationOptions: ({ navigation }) => {
      return {

        headerBackTitle: ' ',
        headerBackground: () => <View style={styles.headerStyle} />,
        // headerRight: () => <Text style={styles.headerRight}>Hypertension</Text>,
        headerBackImage: () => <BackButton navigation={navigation} />,
        headerTintColor: 'white',
        // ...TransitionPresets.ModalPresentationIOS, // add this line
      };
    },
  },
);

export const switchNavigator = createSwitchNavigator(
  {
    mHealth: {
      screen: WelcomeScreen,

      navigationOptions: {
        headerBackground: () => <LinearGradient colors={['#4568dc', '#b06ab3']} style={[StyleSheet.absoluteFill]}
        ></LinearGradient>,
      },
    },

    'DashboardStackNavigator': DashboardStackNavigator,
    Login: {
      screen: Login,
    },
    'Sign Up': {
      screen: SignUpScreen,
    },
  },
);

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  tabbarIcon: {
    

    width: 50,
    height: 50,
    aspectRatio: 1,

    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',


    borderRadius: 999,


    shadowColor: Colors.themeShadowColorPrimary,
    shadowOpacity: 0.9,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  appContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  headerRight: {
    margin: 10,
    color: 'white',
    fontSize: 14,
  },
  headerStyle: {
    backgroundColor: Colors.themeColorPrimary,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  botTapStyle: {
    // backgroundColor: 'black'
  },
  headerGraidient: {
    height: '100%', width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 5,
    // borderRadius: 15,
  },
  blurHeader: {
    width: 500,
    height: '100%'
  },
  tabIcon: {
    paddingTop: '15px',
  },
  tabbarTouch: {
    // width: '100%',
    // height: '100%',
    // aspectRatio: 1,
    // borderRadius: 20,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});