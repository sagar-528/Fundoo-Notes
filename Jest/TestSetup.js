import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAsyncStorage from 'mock-async-storage';
import keyChainMock from '../_mocks_/react-native-keychain'
import RBSheetMock from '../_mocks_/react-native-raw-bottom-sheet'
 
Enzyme.configure({ adapter: new Adapter() });

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.setTimeout(50000);

jest.mock('react-native-keychain', () => keyChainMock)

jest.mock('react-native-raw-bottom-sheet', () => RBSheetMock)

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});


// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  }
});


  jest.mock('react-native-sqlite-storage', () => {
    // const mockSQLite = require('react-native-sqlite-storage');
    const mockSQLite = {
      openDatabase: (...args) => {
        return {
          transaction: (...args) => {
            executeSql: (query) => { return []; }
          }
        };
      }
    }
    return mockSQLite;
  });