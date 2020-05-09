import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import defineFrames from './define-frames';


// PetScreen component
class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevAnimation: this.props.prevAnimation,

      currentFrame: 1,
      // animationName: 'neutral',

      // animationFrames: defineFrames.neutral.frames,
      animationName: this.props.animationName,
      animationFrames: defineFrames[this.props.animationName].frames,
      loopIndex: 2,
      frameIndex: 0,
      returnToDefault: false,
      actionAnimation: false,
    };
    this.handleAnimation = this.handleAnimation.bind(this);
    this.interval = undefined;
  }

  handleAnimation() {
    // Records index of currentFrame when looping through animationFrames array
    let frameIndex = this.state.frameIndex;

    const nextFrame = () => {


      if (this.state.returnToDefault === true) {
        stopAnimation();

        if (this.state.shouldUsePrev) {

          // console.log(this.state.prevAnimation + " inside");


          this.setState({
            returnToDefault: false,
            animationName: this.state.prevAnimation,
            animationFrames: defineFrames[this.state.prevAnimation].frames,
            currentFrame: 1,
            loopIndex: 2,
            frameIndex: 0,
            actionAnimation: false,
          });
        } else {

          // console.log('B');


          this.setState({
            returnToDefault: false,
            animationName: 'neutral',

            animationFrames: defineFrames.neutral.frames,
            currentFrame: 1,
            loopIndex: 2,
            frameIndex: 0,
            actionAnimation: false,
          });
        }

        this.handleAnimation();

      } else if ((this.state.returnToDefault === false) && (this.state.actionAnimation === false) && (this.state.loopIndex === 0)) {
        // console.log('reached stop if');
        this.setState({
          loopIndex: 2,
          frameIndex: 0,
        });
      } else if ((this.state.returnToDefault === false) && ((this.state.actionAnimation === true) && (this.state.loopIndex === 0))) {
        // console.log('stopped because actionAnimation ended');
        this.setState({
          returnToDefault: true,
        });
        stopAnimation();
        this.handleAnimation();
      } else if ((frameIndex + 1) > this.state.animationFrames.length) {
        this.setState({
          loopIndex: this.state.loopIndex - 1,
        });
        frameIndex = 0;
      } else {
        this.setState({ currentFrame: this.state.animationFrames[frameIndex].frame });
        frameIndex = frameIndex + 1;
        this.setState({
          frameIndex: frameIndex,
        });
      }
    };

    const nextFrameTrigger = setInterval(() => {
      nextFrame();
    }, 500);
    this.interval = nextFrameTrigger;

    const stopAnimation = () => {
      clearInterval(nextFrameTrigger);
      console.log('animation has stopped');
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const currentFrames = defineFrames[this.state.animationName].frames;
    const myFrame = currentFrames.find(f => {
      return f.frame === this.state.currentFrame;
    });
    return (
      <View style={styles.petCnt}>
        <Image
          source={myFrame.imgSrc}
          style={styles.petScreenImage}
        />
      </View>
    );
  }

  componentDidMount() {
    this.handleAnimation();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    // console.log("Prev "  + nextProps.prevAnimation)

    if (nextProps.prevAnimation === 'happy' ||
      nextProps.prevAnimation === 'sad' ||
      nextProps.prevAnimation === 'dead' ||
      nextProps.prevAnimation === 'sick' ||
      nextProps.prevAnimation === 'neutral') {

        // console.log('should repeat previous')
        this.setState({
          shouldUsePrev: true,
          prevAnimation: nextProps.prevAnimation
        });
    }

    if (nextProps.animationName !== this.state.animationName) {
      this.setState({
        animationName: nextProps.animationName,
        animationFrames: defineFrames[nextProps.animationName].frames,
        returnToDefault: false,
        actionAnimation: true,
        currentFrame: 1,
        loopIndex: 2,
        frameIndex: 0,
      });
    }
  }
}

// Styles
const styles = StyleSheet.create({
  petScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",

  },
  petCnt: {
    width: '100%',
    height: '35%',
    // padding: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  }
});


export default Animation;