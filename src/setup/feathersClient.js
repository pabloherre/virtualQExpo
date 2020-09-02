import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import AsyncStorage from '@react-native-community/async-storage';

const auth = require('@feathersjs/authentication-client');

let userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate, reAuthenticate;

export default function initFeathersClient() {
  // const client = rest('https://virtual-queue-server.herokuapp.com');

  const client = rest('http://192.168.0.3:3030'); //TODO: use ip instead localhost.-
  const feathersClient = feathers()
    .configure(client.fetch(window.fetch.bind(window)))
    .configure(
      auth({
        jwtStrategy: 'jwt',
        storage: AsyncStorage,
        storageKey: 'accessToken'
      })
    );
  userApi = feathersClient.service('users');
  appointmentApi = feathersClient.service('appointments');
  businessApi = feathersClient.service('business');
  categoryApi = feathersClient.service('categories');
  turnApi = feathersClient.service('turns');
  authenticate = feathersClient.authenticate;
  reAuthenticate = feathersClient.reAuthenticate;
}

export { userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate, reAuthenticate };
