import {Asset} from 'react-native-image-picker';
export interface ProductsI {
  id: string;
  name: string;
  price: string;
  offerPrice: string;
  image: string;
  imageObject: Asset;
}

export interface ProductInitialStateI {
  products: ProductsI[];
  isAddedSuccessfully?: boolean;
  isAdding: boolean;
  isEditing: boolean;
  isEditedSuccessfully?: boolean;
}
