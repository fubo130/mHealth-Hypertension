import React, { Component } from 'react';
import { Alert, Button, Text, View, StyleSheet, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';
import { Auth } from 'aws-amplify';
import { writeToCache, readFromCache, deleteItem } from './../localCache/LocalCache';
import Colors from '../globals/Colors';
import { LinearGradient } from 'react-native-svg';
import { NavigationEvents } from 'react-navigation';



export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: true,

      splashOpacity: new Animated.Value(0),

      signInPressed: false,

      midOpacity: new Animated.Value(0),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // ????????
  onLogin() {
    const { username, password } = this.state;
    if (submitted === false) {
      Alert.alert(
        'Wrong information!',
        'Please check your email address or password and try again!',
        [
          { text: 'Retry', onPress: () => console.log('Press button!') }
        ],
        { cancelable: false }
      )
    } else {

      Alert.alert('Credentials', `${username} + ${password}`);
    }
  }

  navigateToHome() {
    this.props.navigation.navigate('VideoList');
  }

  async handleSubmit() {

    if (this.state.submitted) {
      if (this.state.username === '' || this.state.password === '') {
        Alert.alert("Username and password cannot be empty")
      } else {
        Animated.timing(this.state.splashOpacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }).start()

        Auth.signIn(this.state.username.toLowerCase(), this.state.password).then((user) => {
          writeToCache("accessToken", user.signInUserSession.accessToken.jwtToken);
          writeToCache("idToken", user.signInUserSession.idToken.jwtToken)
          writeToCache("user_id", this.state.username.toLowerCase());
          writeToCache("refreshToken", user.signInUserSession.refreshToken.token);
          writeToCache("user", user.signInUserSession.idToken.payload.email);
          this.navigateToHome();
        })
          .catch(err => {
            console.log(err);
            Alert.alert(err.message);
            this.state.splashOpacity.setValue(0);
          })
      }
    } else {
      Alert.alert(
        'Wrong information!',
        'Please check your email address and try again!',
        [
          { text: 'Retry', onPress: () => console.log('Press button!') }
        ],
        { cancelable: false }
      )
    }
  }

  componentDidMount() {
    Animated.timing(this.state.midOpacity, {
      delay: 100,
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  focused = () => {
    Animated.timing(this.state.midOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  blurred = () => {
    Animated.timing(this.state.midOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      // <View>
      //   {this.background}
      // </View>
      <KeyboardAvoidingView style={styles.keyboardInput} behavior="padding" enabled>
        <NavigationEvents onWillFocus={this.focused} onDidBlur={this.blurred} />
        <Animated.View style={{
          opacity: this.state.midOpacity,

          transform: [
            {
              scale: this.state.midOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 1],
              })
            }
          ]
        }}>

          <Form ref="Log In" onSubmit={this.handleSubmit}>
            <Text style={styles.title}>Sign In</Text>
            <TextValidator
              title="Email: "
              style={styles.input}
              name="email"
              lable="Email"
              validators={['required', 'isEmail']}
              errorMessages={['This field is required!', 'Email invalid!']}
              onError={errors => this.setState({ submitted: false })}
              placeholder="Email"
              type="text"
              keyboardTypes="email-address"
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
            />
            <TextValidator
              title="Password: "
              style={styles.input}
              name="password"
              lable="Password"
              validators={['required']}
              errorMessages={['This field is required!']}
              placeholder="Password"
              type="text"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={this.handleSubmit} >
              <Text style={{
                fontSize: 18,
                color: Colors.themeColorPrimary
              }}>
                Login
            </Text>
            </TouchableOpacity>


            {/* <TouchableOpacity style={styles.buttonUp} onPress={() => this.props.navigation.navigate('VideoList')} >
            <Text style={{
              fontSize: 18,
              color: 'black'
            }}>
              Play as Guest
                        </Text>
          </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonT} onPress={() => this.props.navigation.navigate('Sign Up')} >
              <Text style={{
                fontSize: 16,
                color: 'rgba(50,50,50,1)',
                textDecorationLine: 'underline',
              }}>
                Go to Sign Up
                     </Text>
            </TouchableOpacity>
          </Form>
        </Animated.View>

        <Animated.View style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          width: '100%',
          height: Dimensions.get('window').height,
          position: 'absolute',
          bottom: 0,
          opacity: this.state.splashOpacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',

          transform: [
            {
              translateY: this.state.splashOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').height, 0]
              })
            }
          ]
        }}>
          <ActivityIndicator size="large" color={'white'} />
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonT: {
    marginTop: 16,
    width: 200,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black',
    width: 200,
    height: 50,
    // borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 10,
  },
  buttonUp: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    height: 50,
    // borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 10,
  },
  keyboardInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.themeColorPrimary,
  },
  input: {
    width: 200,
    height: 44,
    borderColor: 'black',
    marginBottom: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    textAlign: 'left',
    fontSize: 15,
    marginTop: 25,
  },
  welcomeBackground: {
    zIndex: -1,
    width: '100%',
    height: '100%'
  },
});