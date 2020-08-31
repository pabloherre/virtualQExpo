import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

let userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate;

export default function initFeathersClient() {
  const client = rest('http://localhost:3030/');
  const feathersClient = feathers().configure(client.fetch(window.fetch.bind(window)));
  userApi = feathersClient.service('users');
  appointmentApi = feathersClient.service('appointments');
  businessApi = feathersClient.service('businness');
  categoryApi = feathersClient.service('categories');
  turnApi = feathersClient.service('turns');
  authenticate = feathersClient.service('authentication');
}

export { userApi, appointmentApi, businessApi, categoryApi, turnApi, authenticate };
