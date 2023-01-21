import {Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {HStack, VStack, Button} from 'native-base';
import {ProductsI} from '../types/product';

interface ProductItemPropsI {
  item: ProductsI;
  deleteItem: (id: string) => void;
  navigation: any;
  resetEdit: () => void;
}

const ProductItem: React.FC<ProductItemPropsI> = props => {
  const {item, deleteItem, navigation, resetEdit} = props;

  const handleDelete = () => {
    deleteItem(item.id);
  };

  const handleEdit = () => {
    resetEdit();
    navigation.navigate('edit', item);
  };

  return (
    <HStack padding={2} backgroundColor={'#fff'} margin={2}>
      <VStack flex={1}>
        <Image
          source={{uri: item.image}}
          style={{resizeMode: 'cover', width: 80, height: 80, borderRadius: 8}}
        />
      </VStack>
      {/* <Image /> */}
      <VStack flex={2}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>Price: {item.price}</Text>
        <Text>Offer Price: {item.offerPrice}</Text>
      </VStack>
      <VStack flex={1}>
        <Button colorScheme={'red'} onPress={handleDelete}>
          Delete
        </Button>
        <Button onPress={handleEdit}>Edit</Button>
      </VStack>
    </HStack>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
});

export default ProductItem;
