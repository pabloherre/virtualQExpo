import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.requireActual('./mocks');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('expo-barcode-scanner');
jest.mock('expo-location');
jest.mock('react-native-maps');
