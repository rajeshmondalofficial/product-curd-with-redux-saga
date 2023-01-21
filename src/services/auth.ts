import auth from '@react-native-firebase/auth';
import {LoginCredentialsI} from '../types';

export const loginWithUsernameAndPassword = (data: LoginCredentialsI) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(data.username, data.password)
      .then(userCredentials => {
        resolve(userCredentials.user);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const createUserWithUsernameAndPassword = (data: LoginCredentialsI) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(data.username, data.password)
      .then(userCredentials => {
        resolve(userCredentials.user);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const checkForUserLoginPersistance = () => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
};
