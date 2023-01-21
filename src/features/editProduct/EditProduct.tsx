import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Input, Button, HStack, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';

import {ProductInitialStateI, ProductsI} from '../../types/product';
import {AppDispatch, RootStateI} from '../../stores';
import {
  CREATE_PRODUCT,
  EDIT_PRODUCT_WITHOUT_IMAGE,
  EDIT_PRODUCT_WITH_IMAGE,
} from '../../stores/productSlice';

interface EditProductPropsI {
  editWithImage: (product: ProductsI) => void;
  editWithoutImage: (product: ProductsI) => void;
  product: ProductInitialStateI;
  navigation: any;
  route: any;
}

const EditProduct: React.FC<EditProductPropsI> = props => {
  const {editWithImage, editWithoutImage, product, route, navigation} = props;
  const [imageUri, setImageUri] = useState(route?.params?.image);
  const [image, setImage] = useState<Asset>();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductsI>({defaultValues: route.params});

  useEffect(() => {
    if (product.isEditedSuccessfully) {
      reset();
      setImage(undefined);
      ToastAndroid.show('Product edited successfully', ToastAndroid.SHORT);
      navigation.replace('list');
    }
  }, [product.isEditedSuccessfully]);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'})
      .then(response => {
        if (response.assets) {
          setImageUri(response.assets[0]?.uri);
          setImage(response.assets[0]);
        }
      })
      .catch(error => {});
  };

  const handleFormReset = () => {
    setImage(undefined);
  };

  const onSubmit = (data: ProductsI) => {
    if (image) {
      editWithImage({...data, imageObject: image});
    } else {
      editWithoutImage(data);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Product</Text>
        {product.isEditing ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Product Name</Text>
              <Controller
                name="name"
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter product name"
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.errorText}>
                  Please enter your product name
                </Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Product Price</Text>
              <Controller
                name="price"
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    keyboardType="number-pad"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter product price"
                  />
                )}
              />
              {errors.price && (
                <Text style={styles.errorText}>
                  Please enter your product name
                </Text>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Offer Price</Text>
              <Controller
                name="offerPrice"
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    keyboardType="number-pad"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter product offer price"
                  />
                )}
              />
              {errors.offerPrice && (
                <Text style={styles.errorText}>
                  Please enter your product name
                </Text>
              )}
            </View>

            <View style={styles.formGroup}>
              {imageUri && (
                <Image
                  source={{uri: imageUri}}
                  style={{
                    width: Dimensions.get('window').width - 24,
                    height: 250,
                    resizeMode: 'cover',
                  }}
                />
              )}
              <Text style={styles.label}>Product Image</Text>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={handleImagePicker}>
                <Image source={require('../../assets/ic_add_image.png')} />
              </TouchableOpacity>
            </View>

            <HStack>
              <Button
                style={{width: Dimensions.get('window').width - 24}}
                onPress={handleSubmit(onSubmit)}>
                Update Product
              </Button>
            </HStack>
          </React.Fragment>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
  },
  label: {
    fontWeight: 'bold',
    padding: 2,
  },
  formGroup: {
    padding: 12,
    width: Dimensions.get('window').width,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  signupLink: {
    marginTop: 24,
  },
  imagePicker: {
    width: Dimensions.get('window').width - 24,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    padding: 36,
  },
  errorText: {color: '#ff0000', padding: 2},
});

const mapStateToProps = (state: RootStateI) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispath: AppDispatch) => {
  return {
    editWithImage: (payload: ProductsI) =>
      dispath({type: EDIT_PRODUCT_WITH_IMAGE, payload}),
    editWithoutImage: (payload: ProductsI) => {
      dispath({type: EDIT_PRODUCT_WITHOUT_IMAGE, payload});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
