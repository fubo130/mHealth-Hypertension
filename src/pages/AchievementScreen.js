import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, Alert, Animated } from 'react-native';

import { AppCredit, AppProgress } from '../globals/appManager';


import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { withTheme } from 'react-native-elements';
import Colors from '../globals/Colors';

let goldTotal = 0;

export class AchievementScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            achAnim: new Animated.Value(0),
            achievementList: [],
            totalGold: 0,
        }

        this.focused = this.focused.bind(this);
        this.claimGold = this.claimGold.bind(this);
    }

    claimGold() {

        this.forceUpdate()

        if (AppProgress.learningProgress >= 25) {
            const c = 50;

            if (!AppCredit.achieve1) {
                AppCredit.addCredit(c);
                AppCredit.completeAch1();

                goldTotal += c
            }
        }

        if (AppProgress.learningProgress >= 75) {
            const c = 25;


            if (!AppCredit.achieve2) {
                AppCredit.addCredit(c);
                AppCredit.completeAch2();

                goldTotal += c
            }

        }

        if (AppProgress.learningProgress >= 100) {
            const c = 100;

            if (!AppCredit.achieve3) {
                AppCredit.addCredit(c);
                AppCredit.completeAch3();

                goldTotal += c
            }
        }

        this.setState({ totalGold: goldTotal })

        if (this.state.achievementList.length > 0) {
            Alert.alert("You have earned " + goldTotal + " gold from your achievements!")
        } else {
            Alert.alert("You have no achievements yet!")
        }
    }

    _startAchAnim = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.achAnim, {
                    toValue: 1,
                    duration: 1000,
                }),
                Animated.timing(this.state.achAnim, {
                    toValue: 0,
                    duration: 1000
                })
            ]),
        ).start()
    };

    UNSAFE_componentWillMount() {
        this._startAchAnim();
    }

    focused() {

        this.forceUpdate()

        if (AppProgress.learningProgress >= 25) {
            const c = 50;
            this.state.achievementList.push(
                {
                    title: 'Live and learn',
                    gold: c
                }
            );
        }

        if (AppProgress.learningProgress >= 75) {
            const c = 25;
            this.state.achievementList.push(
                {
                    title: 'No longer a rookie',
                    gold: c
                }
            );
        }

        if (AppProgress.learningProgress >= 100) {
            const c = 100;
            this.state.achievementList.push(
                {
                    title: 'Say no to Hypertension!',
                    gold: c
                }
            );
        }

        this.setState({ totalGold: goldTotal })

    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={this.focused}
                />
                <View style={{
                    height: '36%',
                    width: '100%',
                    backgroundColor: 'rgb(70,70,70)',
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <Text style={{
                        color: '#ffd700',
                        fontSize: 20,
                        margin: 20,

                        shadowColor: '#ffd700',
                        shadowOpacity: 1,
                        shadowOffset: { height: 0, width: 0 },
                        shadowRadius: 14,
                    }}>
                        Claim Gold from Achievements
                    </Text>


                    <Animated.View style={{
                        height: '50%',
                        aspectRatio: 1,
                        backgroundColor: '#ffd700',
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',

                        shadowColor: '#ffd700',
                        shadowOpacity: this.state.achAnim,
                        shadowOffset: { height: 0, width: 0 },
                        shadowRadius: 14,
                    }}>
                        <TouchableOpacity
                            style={{
                                height: '100%',
                                aspectRatio: 1,
                                borderRadius: 999,
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',

                            }}
                            onPress={this.claimGold}
                        >
                            <Text style={{
                                fontSize: 36,
                                color: 'white'
                            }}>
                                {this.state.totalGold}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <ScrollView style={{
                    width: '100%', height: '100%', backgroundColor: 'rgb(70,70,70)',
                }}>
                    <View style={styles.scroll}>
                        {this.state.achievementList.map((item, key) =>
                            <TouchableOpacity style={styles.achCnt} key={key} onPress={() => Alert.alert('You have earned ' + item.gold + ' credits from this achievement')}>
                                <Text style={styles.achItem}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    scroll: {
        marginTop: 40,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // backgroundColor: 'white',
    },
    achCnt: {
        display: "flex",
        padding: 20,
        justifyContent: 'center',

        width: '80%',
        backgroundColor: Colors.themeColorPrimary,
        marginBottom: 20,
        borderRadius: 10,

        shadowColor: Colors.themeShadowColorPrimary,
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 18,
    },
    achItem: {
        color: 'black',
        fontSize: 16,
    }
});

