import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Colors from './../globals/Colors';



export const BackButton = ({ navigation }) => {
    const onPress = () => navigation.goBack();

    return (
        <Icon
            color={'white'}
            // containerStyle={styles.backButton}
            name="chevron-left"
            onPress={onPress}
            size={30}
        />
    );
};

export const MHealthBackBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.mHealthContBack, style]}>
            <Icon
                color={Colors.themeColorPrimary}
                containerStyle={styles.mIconBack}
                name="expand-more"
                size={60}
            />
            {/* <Text style={[styles.mHealthText, textStyle]}>{props.title}</Text> */}
        </TouchableOpacity>
    );
};

export const MHealthBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.mHealthCont, style]}>
            <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradStyle}>
                <Icon
                    color={'rgba(255,255,255,0.8)'}
                    containerStyle={styles.mIcon}
                    name="expand-less"
                    size={60}
                />
                <Text style={[styles.mHealthText, textStyle]}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export const SignInBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.signInCont, style]}>
            <Text style={[styles.signInText, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const SignOutBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.signOutCont, style]}>
            <Text style={[styles.signOutText, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const SignUpBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.signUpCont, style]}>
            <Text style={[styles.signUpText, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const PlayBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.playCont, style]}>
            <Text style={[styles.playText, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const EditProfileBtn = (props) => {
    const { title = {}, style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity title={title} onPress={onPress} style={[styles.editProfileCont, style]}>
            <Text style={[styles.editProfileText, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const VideoButton = (props) => {
    const { num = {}, source = {}, title = {}, style = {}, label, imageStyle = {}, onPress, disabled, children, subTitle = {} } = props;


    return (
        <TouchableOpacity disabled={disabled} title={title} onPress={onPress} style={[styles.videoBtnContainer, style]}>

            <ImageBackground source={props.source} style={{ width: '100%', height: 240, resizeMode: "cover" }} >
                {disabled &&
                    <View style={{
                        width: '100%',
                        height: 240,
                        resizeMode: "cover",
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',

                    }}>
                        <Icon
                            color={Colors.themeColorPrimary}
                            // color={'white'}
                            name="lock-outline"
                            size={100}
                        />
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                            marginTop: 15
                        }}
                        >
                            Please complete part {props.subTitle}
                        </Text>
                    </View>
                }
                {children}


            </ImageBackground>



            <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 6,
            }}>
                <Text style={{
                    fontWeight: '300',
                    fontSize: 20,
                    color: 'white',
                }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mIconBack: {
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 5,
    },
    mIcon: {
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 5,
    },
    mHealthContBack: {
        display: 'flex',
        minHeight: '10%',
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: 10,
    },
    mHealthCont: {
        display: 'flex',
        minHeight: '10%',
        minWidth: '100%',
       
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 20,
    },
    gradStyle: {
        // margin: 50,
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
    },
    mHealthText: {
        fontSize: 20,
        marginTop: 30,
        marginBottom: 70,
        alignSelf: 'center',
        color: 'white',
        // backgroundColor: 'black',
    },
    videoBtnContainer: {
        // height: 300,
        width: '100%',
        // marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoCoverImage: {
        flex: 1,
        resizeMode: "contain",
    },
    signUpCont: {
        display: 'flex',
        minHeight: '12%',
        minWidth: '86%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        borderColor: Colors.themeColorPrimary,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    signUpText: {
        fontSize: 16,
        color: Colors.themeColorPrimary,
        textTransform: 'uppercase'
    },
    signInCont: {
        display: 'flex',
        minHeight: '12%',
        minWidth: '86%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        // borderTopLeftRadius: 99999999,
        // borderTopRightRadius: 99999999,
        // borderBottomLeftRadius: 2,
        // borderBottomRightRadius: 2,

        // borderWidth: 1,
        // borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.themeColorPrimary
    },
    signInText: {
        fontSize: 16,
        color: 'black',
        textTransform: 'uppercase'
    },
    playCont: {
        display: 'flex',
        minHeight: '12%',
        minWidth: '86%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.themeColorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
        // backgroundColor: Colors.themeColorPrimary,
        // backgroundColor: 'rgba(0,0,0,0.75)'
        // borderBottomLeftRadius: 99999999,
        // borderBottomRightRadius: 99999999,
        // borderTopRightRadius: 2,
        // borderTopLeftRadius: 2,
    },

    playText: {
        fontSize: 16,
        color: Colors.themeColorPrimary,
        textTransform: 'uppercase'
    },

    signOutCont: {
        display: 'flex',
        minHeight: '13%',
        minWidth: '100%',
        padding: 18,
        // marginLeft: 15,
        // marginRight: 15,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.themeColorPrimary,
        borderWidth: 2,
        borderStyle: 'solid',
        // borderRadius: 5,
        borderColor: 'white',

        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 6,
        // marginBottom: 0,
    },

    signOutText: {
        fontSize: 16,
        color: Colors.themeColorPrimary,
        textTransform: 'uppercase'
    },
    editProfileCont: {
        display: 'flex',
        minHeight: '13%',
        minWidth: '100%',
        padding: 18,
        // marginLeft: 15,
        // marginRight: 15,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.themeColorPrimary,
        borderWidth: 2,
        // borderRadius: 5,
        borderColor: 'transparent',

        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 6,
        // marginBottom: 0,
    },

    editProfileText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase'
    },
});
