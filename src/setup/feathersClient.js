import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

let userApi, appointmentApi, businessApi, categoryApi, turnApi;

export default function initFeathersClient() {
  const client = rest('https://virtual-queue-server.herokuapp.com');
  feathersClient = feathers().configure(client.fetch(window.fetch.bind(window)));
  userApi = feathersClient.service('users');
  appointmentApi = feathersClient.service('appointments');
  businessApi = feathersClient.service('businness');
  categoryApi = feathersClient.service('categories');
  turnApi = feathersClient.service('turns');
}

export { userApi, appointmentApi, businessApi, categoryApi, turnApi };
