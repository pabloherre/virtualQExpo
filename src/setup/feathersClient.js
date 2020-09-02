import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

let userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate;

export default function initFeathersClient() {
  // const client = rest('https://virtual-queue-server.herokuapp.com');
  const client = rest('http://192.168.0.3:3030');
  const feathersClient = feathers().configure(client.fetch(window.fetch.bind(window)));
  userApi = feathersClient.service('users');
  appointmentApi = feathersClient.service('appointments');
  businessApi = feathersClient.service('business');
  categoryApi = feathersClient.service('categories');
  turnApi = feathersClient.service('turns');
  authenticate = feathersClient.service('authentication');
}

export { userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate };
