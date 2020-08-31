import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

export class NotificationService {
  static initNotificationHandler = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
      })
    });
    return null;
  };

  static registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: 'red'
      });
    }

    return token;
  };

  static sendPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your line is moving!',
        body: 'Only 3 turns left before yours.',
        data: { data: 'goes here' }
      },
      trigger: { seconds: 2 },
      // to: await AsyncStorage.getItem('expoPushToken')
    });

    // const message = {
    //   to: await AsyncStorage.getItem('expoPushToken'),
    //   sound: 'default',
    //   title: 'Your line is moving!',
    //   body: 'Only 3 turns left before yours.',
    //   data: { data: 'goes here' },
    //   android: {
    //     channelId: 'default'
    //   }
    // };
    //
    // try {
    //   await fetch('https://exp.host/--/api/v2/push/send', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Accept-encoding': 'gzip, deflate',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(message)
    //   });
    // } catch (e) {
    //   console.log('error', e);
    // }
  };
}
