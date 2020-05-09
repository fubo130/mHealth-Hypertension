import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export class Notifi extends Component {
  sendNotifications = async() => {
    // Not to create duplicated notifications first cancel all notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const localnotification = {
      title: 'Time for Medicine!',
      body: 'Remember take your medicine!',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfter3Seconds = Date.now();
    sendAfter3Seconds += 3000;

    const schedulingOptions = { time: sendAfter3Seconds, repeat: 'minute'};
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  UNSAFE_componentWillMount() {
    getiOSNotificationPermission();
    this.listenForNotifications();
  }

  componentDidMount() {
    this.sendNotifications();
  }
  
  render() {
      return null;
  }
}
