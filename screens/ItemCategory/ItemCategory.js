

import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import ItemCategoryList from './ItemCategoryList';
import { HeaderBackButton } from "@react-navigation/stack";
import { Card, Badge, withBadge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as CategoryAction from '../../store/actions/CategoryAction';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ItemCategory = ({ navigation, route }) => {

  const userdata = useSelector(state => state.user.UserData);
  const batchicon = useSelector(state => state.cart.BatchIcon);
  const dispatch = useDispatch();
  const { catId } = route.params;
  const { subCatId } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const TotalItemCategory = useSelector(state => state.category.ItemCategoryData);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon

            name='search-outline'
            type='font-awesome'
            size={23}
            color={color.blue}

            onPress={() => console.log('helgtylo')} />
          <Icon
            style={{ marginLeft: wp('2.5%') }}
            name='heart-outline'
            type='font-awesome'
            size={23}
            color={color.blue}

            onPress={() => navigation.navigate('Wish')} />
          <View>
            <Badge containerStyle={{ position: 'absolute', top: -9, right: 1, zIndex: 1 }} value={batchicon} status="error" />

            <Icon
              style={{ marginLeft: wp('2.5%'), marginRight: wp('2.5%') }}
              name='cart-outline'
              type='font-awesome'
              size={23}
              color={color.blue}

              onPress={() => navigation.navigate('Cart')} />
          </View>
        </View>
      ), headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HeaderBackButton onPress={() => moveBack()} />

        </View>
      ),

    });
  }, [navigation, batchicon]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(CategoryAction.fetchItemCategory(catId, subCatId, userdata.userData._id))
    });


  }, [dispatch]);


  const moveBack = () => {
    dispatch(CategoryAction.clearItemCategory())
    navigation.pop();

  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const navigateToScreen = (id, name, addOnPrice, gstPercent, voozooProfit, discount, cod) => {

    navigation.navigate('ProductList', { catId, subCatId, itemCatId: id, screenTitle: name, addOnPrice, gstPercent, voozooProfit, discount, cod });
  }
  return (

    <View style={styles.container}>





      <ItemCategoryList navigateTo={navigateToScreen} itemCatData={TotalItemCategory} />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default ItemCategory;
