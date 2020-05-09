import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';
import { Auth } from 'aws-amplify';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { writeToCache, readFromCache } from './../localCache/LocalCache';
import Colors from '../globals/Colors';
import { NavigationEvents } from 'react-navigation';

export class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            checked: true,
            submited: false,
            confirmKey: '',
            splashOpacity: new Animated.Value(0),
            midOpacity: new Animated.Value(0),


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleResendSignUp = this.handleResendSignUp.bind(this);
    }

    componentWillUnmount() {
        Form.removeValidationRule('passwordMatch');
    }


    async handleSubmit() {
        console.log(this.state.checked);

        if (this.state.checked && this.state.password === this.state.confirmPassword) {
            if (this.state.username === '' || this.state.password === '') {
                Alert.alert("Username and password cannot be empty")
            } else {
                Animated.timing(this.state.splashOpacity, {
                    toValue: 1,
                    duration: 120,
                    useNativeDriver: true,
                }).start()

                const username = this.state.username.toLowerCase();
                const password = this.state.password;
                try {
                    const signUpResponse = await Auth.signUp({
                        username,
                        password,
                        attributes: {
                            email: username
                        }
                    });
                    console.log(signUpResponse);
                    this.setState({ submited: true }, () => {
                        this.state.splashOpacity.setValue(0);
                    });
                    // TODO: sign in again
                    // SecureStore.setItemAsync("key", JSON.stringify(signUpResponse));

                    // do some saving?
                } catch (error) {
                    this.state.splashOpacity.setValue(0);
                    console.log(error);
                    this.setState({ submited: false });
                    Alert.alert(error.message);
                }
            }
        } else {
            Alert.alert(
                'Wrong information!',
                'Please check your email address or password and try again!',
                [
                    {
                        text: 'Retry', onPress: () => {
                            console.log('resending');
                        }
                    }
                ],
                { cancelable: false }
            )
        }
    }

    async handleResendSignUp() {

        Auth.resendSignUp(this.state.username.toLowerCase())
            .then(() => {
                console.log('successfully resend');
                Alert.alert("A new confirmation has been sent to your email")
            })
            .catch((err) => console.log(err));
        await writeToCache("user", this.state.username.toLowerCase())
    }

    navigateToHome() {
        this.props.navigation.navigate('VideoList');
    }

    handleConfirm() {
        // const go = this.props.navigation.navigate('Learn');

        if (this.state.confirmKey === '') {
            Alert.alert('Confirmation code cannot be empty')
        } else if (isNaN(this.state.confirmKey)) {
            Alert.alert('Please enter a number')
        } else {
            Animated.timing(this.state.splashOpacity, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }).start()

            Auth.confirmSignUp(this.state.username.toLowerCase(), this.state.confirmKey)
                .then(async () => {
                    Auth.signIn(this.state.username.toLowerCase(), this.state.password).then((user) => {
                        writeToCache("accessToken", user.signInUserSession.accessToken.jwtToken);
                        writeToCache("idToken", user.signInUserSession.idToken.jwtToken);
                        writeToCache("refreshToken", user.signInUserSession.refreshToken.token);
                        writeToCache("user", user.signInUserSession.idToken.payload.email);
                        writeToCache("user_id", this.state.username.toLowerCase());
                        this.navigateToHome();
                      })
                        .catch(err => {
                          console.log(err);
                          Alert.alert(err.message);
                          this.state.splashOpacity.setValue(0);
                        })
                    let temp = await readFromCache("idToken");
                    console.log(temp)
                    this.navigateToHome();
                    console.log('successful confirm signed up')
                })
                .catch(err => {
                    this.state.splashOpacity.setValue(0)

                    console.log('error confirm signing up: ', err)
                    Alert.alert(
                        'Incorrect confirmation code',
                        // 'A new code has been resent to your email address',
                        [
                            {
                                text: 'Retry', onPress: () => {
                                    console.log('Press button!')
                                    // this.handleResendSignUp();
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                });
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
                    {this.state.submited === false ? <Form ref="Signup" onSubmit={this.handleSubmit}>
                        <Text style={styles.title}>Sign Up</Text>
                        <TextValidator
                            title="Email: "
                            style={styles.input}
                            name="email"
                            lable="Email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required!', 'Email invalid!']}
                            onError={errors => this.setState({ checked: false })}
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
                        <TextValidator
                            title="Re-enter Password: "
                            style={styles.input}
                            name="repeatPassword"
                            lable="Confirm Password"
                            validators={['required']}
                            errorMessages={['This field is required!']}
                            placeholder="Confirm Password"
                            type="text"
                            value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.handleSubmit} >
                            <Text style={{
                                fontSize: 18,
                                color: Colors.themeColorPrimary
                            }}>
                                Create Account
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
                        <TouchableOpacity style={styles.buttonT} onPress={() => this.props.navigation.navigate('Login')} >
                            <Text style={{
                                fontSize: 16,
                                color: 'rgba(50,50,50,1)',
                                textDecorationLine: 'underline',
                            }}>
                                Go to Sign In
                     </Text>
                        </TouchableOpacity>
                    </Form>

                        :

                        <Form ref="Signup" onSubmit={this.handleSubmit}>
                            <Text style={styles.title}>Confirmation</Text>
                            <TextValidator
                                style={styles.input}
                                validators={['required']}
                                errorMessages={['This field is required!']}
                                placeholder="Confirm key"
                                type="text"
                                keyboardTypes="text"
                                value={this.state.confirmKey}
                                onChangeText={(confirmKey) => this.setState({ confirmKey })}
                            />
                            <TouchableOpacity style={styles.button} onPress={this.handleConfirm} >
                                <Text style={{
                                    fontSize: 18,
                                    color: Colors.themeColorPrimary
                                }}>
                                    Confirm
                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonT} onPress={this.handleResendSignUp} >
                                <Text style={{
                                    fontSize: 16,
                                    color: 'rgba(50,50,50,1)',
                                    textDecorationLine: 'underline',
                                }}>
                                    Resend Confirmation Code
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonT} onPress={() => this.props.navigation.navigate('mHealth')} >
                                <Text style={{
                                    fontSize: 16,
                                    color: 'rgba(50,50,50,1)',
                                    textDecorationLine: 'underline',
                                }}>
                                    Go to Home
                                </Text>
                            </TouchableOpacity>
                        </Form>
                    }
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
        )
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
});