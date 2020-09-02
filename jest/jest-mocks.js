import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

const mockfeathersMethods = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
  remove: jest.fn()
};
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.requireActual('./mocks');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('expo-barcode-scanner');
jest.mock('expo-location');
jest.mock('react-native-maps');
jest.mock('../src/setup/feathersClient', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    userApi: mockfeathersMethods,
    appointmentApi: mockfeathersMethods,
    businessApi: mockfeathersMethods,
    categoryApi: mockfeathersMethods,
    turnApi: mockfeathersMethods,
    authenticate: jest.fn(),
    reAuthenticate: jest.fn()
  };
});
jest.mock('../src/services/user/User.service');
jest.mock('../src/modules/auth/Auth.service');
jest.mock('../src/common/sideMenu/SideMenu.service');
jest.genMockFromModule('../src/setup/store');
