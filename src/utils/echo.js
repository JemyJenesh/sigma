import Echo from 'laravel-echo';
import pusher from 'pusher-js/react-native';
import Config from 'react-native-config';

pusher.logToConsole = true;

let PusherClient = new pusher('6250666ea552bb2494e7', {
  cluster: Config.PUSHER_APP_CLUSTER,
  // authEndpoint: Config.SERVER_URL + 'http://192.168.1.3:8000/api/broadcasting/auth',
  authEndpoint: 'http://192.168.1.3:8000/api/broadcasting/auth',
});

let echo = new Echo({
  broadcaster: 'pusher',
  client: PusherClient,
});

export default echo;
