

import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import Slider from '../home/Slider';
import { HeaderBackButton } from "@react-navigation/stack";
import SubCategoryList from './SubCategoryShopingList';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Badge, withBadge } from 'react-native-elements';
import baseUrl from '../../constants/baseUrl';
import * as CategoryAction from '../../store/actions/CategoryAction';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const SubCategory = ({ navigation, route }) => {

    const { catId } = route.params;
    const { headerimage } = route.params;

    const dispatch = useDispatch();
    const TotalSubCategory = useSelector(state => state.category.SubCategoryData);
    const batchicon = useSelector(state => state.cart.BatchIcon);
    // console.log(TotalSubCategory);

    const [refreshing, setRefreshing] = useState(false);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon

                        name='search-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => console.log('hello')} />
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
            dispatch(CategoryAction.fetchSubCategory(catId))
        });


    }, [dispatch]);

    const moveBack = () => {
        dispatch(CategoryAction.clearSubCategory())
        navigation.pop();

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const navigateToScreen = (id, name) => {
        navigation.navigate('ItemCategory', { catId, subCatId: id, screenTitle: name });
    }

    return (

        <View style={styles.container}>


            <View style={styles.imageview}>
                <Image style={{ height: '100%', width: '100%' }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + headerimage }} />
            </View>
            {/*SHOPING LIST */}
            <SubCategoryList subCatData={TotalSubCategory} navigateTo={navigateToScreen} />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageview: {
        height: hp('25%'),
        width: wp('100%'),
        marginTop: 2
    }
});

export default SubCategory;
