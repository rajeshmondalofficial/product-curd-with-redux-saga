import firestore from '@react-native-firebase/firestore';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {Asset} from 'react-native-image-picker';

import {ProductsI} from '../types/product';

export const createProductInFirestore = (product: ProductsI) => {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).substr(2, 9);
    uploadFileToStorage(product.imageObject)
      .then(fileUrl => {
        firestore()
          .collection('products')
          .doc(id)
          .set({...product, id, image: fileUrl})
          .then(() => {
            resolve({...product, id, image: fileUrl});
          })
          .catch(error => {
            reject(error.message);
          });
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('products')
      .get()
      .then(response => {
        const products: any = [];
        response.forEach(product => {
          products.push(product.data());
        });
        resolve(products);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const uploadFileToStorage = (file: Asset) => {
  return new Promise((resolve, reject) => {
    const storageRef = storage().ref(`images/${file.fileName}`);
    if (file.uri) {
      const task = storageRef.putFile(file.uri);
      task.then(async () => {
        const url = await storageRef.getDownloadURL();
        resolve(url);
      });
    } else {
      reject('File-not-found');
    }
  });
};

export const deleteProduct = (id: string) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        resolve({message: 'Product deleted successfully'});
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const editProductWithoutImage = (product: ProductsI) => {
  const {name, offerPrice, price} = product;
  return new Promise((resolve, reject) => {
    firestore()
      .collection('products')
      .doc(product.id)
      .update({name, offerPrice, price})
      .then(() => {
        resolve(product);
      })
      .catch(error => {
        reject(error.message);
      });
  });
};

export const editProductWithImage = (product: ProductsI) => {
  const {name, offerPrice, price} = product;
  return new Promise((resolve, reject) => {
    uploadFileToStorage(product.imageObject).then(fileUri => {
      firestore()
        .collection('products')
        .doc(product.id)
        .update({name, offerPrice, price, image: fileUri})
        .then(() => {
          resolve({...product, image: fileUri});
        })
        .catch(error => {
          reject(error.message);
        });
    });
  });
};
