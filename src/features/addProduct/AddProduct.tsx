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
import {CREATE_PRODUCT} from '../../stores/productSlice';

interface AddProductPropsI {
  addProduct: (product: ProductsI) => void;
  product: ProductInitialStateI;
}

const AddProduct: React.FC<AddProductPropsI> = ({addProduct, product}) => {
  const [image, setImage] = useState<Asset>();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductsI>();

  useEffect(() => {
    if (product.isAddedSuccessfully) {
      reset();
      setImage(undefined);
      ToastAndroid.show('Product added successfully', ToastAndroid.SHORT);
    }
  }, [product.isAddedSuccessfully]);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'})
      .then(response => {
        if (response.assets) {
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
      addProduct({...data, imageObject: image});
    } else {
      ToastAndroid.show('Please select an image', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Product</Text>
        {product.isAdding ? (
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
              <Text style={styles.label}>Product Image</Text>
              {image ? (
                <Image
                  source={{uri: image.uri}}
                  style={{
                    width: Dimensions.get('window').width - 24,
                    height: 250,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={handleImagePicker}>
                  <Image source={require('../../assets/ic_add_image.png')} />
                </TouchableOpacity>
              )}
            </View>

            <HStack>
              <Button
                onPress={handleFormReset}
                colorScheme={'red'}
                style={{width: Dimensions.get('window').width / 2 - 12}}>
                Reset
              </Button>
              <Button
                style={{width: Dimensions.get('window').width / 2 - 12}}
                onPress={handleSubmit(onSubmit)}>
                Add Product
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
    addProduct: (payload: ProductsI) =>
      dispath({type: CREATE_PRODUCT, payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
