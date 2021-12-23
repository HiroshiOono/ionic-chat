import { Firebase.Error } from './firebase.error';

describe('Firebase.Error', () => {
  it('should create an instance', () => {
    expect(new Firebase.Error()).toBeTruthy();
  });
});
