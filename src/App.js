import { IonApp, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import BiorhythmCard from './components/BiorhythmCard';
import { useStoredState } from './lib/hooks';
import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import {iterableAPIKey, testEmail} from './Config'; 
function getToday() {
  return new Date().toISOString().slice(0, 'yyyy-mm-dd'.length)
}

function App() {
  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        await registerNotifications();
        await addListeners();
      } catch (error) {
        console.error('Error initializing push notifications:', error);
        // Handle error gracefully, e.g., show a message to the user
      }
    };

    initializePushNotifications();

    return () => {
      // Clean up event listeners or other resources if needed
    };
  }, []);

  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token:', token.value);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("api_key", iterableAPIKey);

      const raw = JSON.stringify({
        "email": testEmail,
        "device": {
          "applicationName": "com.reiterableCoffee.biorhythms",
          "platform": "GCM",
          "token": token.value,
          "dataFields": {
            "endpointEnabled": true
          }
        }
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://api.iterable.com/api/users/registerDeviceToken\n", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error:', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received:', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  };

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  };


  const [birthDate, setBirthDate] = useStoredState('birthDate', '')
  const [targetDate, setTargetDate] = useState(getToday)

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Biorhythms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {Boolean(birthDate) && (<BiorhythmCard targetDate={targetDate} birthDate={birthDate} />)}
        <IonList>
          <IonItem>
            <IonLabel position='fixed'>Birth Date:</IonLabel>
            <IonInput type='date' value={birthDate} onIonChange={(event) => setBirthDate(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position='fixed'>Target Date:</IonLabel>
            <IonInput type='date' value={targetDate} onIonChange={(event) => setTargetDate(event.detail.value)} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonApp>
  );
}

export default App;
