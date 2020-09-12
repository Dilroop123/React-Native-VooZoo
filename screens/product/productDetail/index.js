import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconic from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import baseUrl from '../../../constants/baseUrl';
import * as CartAction from '../../../store/actions/CartAction';
import { Card, ListItem, Badge, withBadge } from 'react-native-elements';
import ProductSizeFilter from '../ProductSizeFilter';

import ProductBasicDetails from '../../../components/ProductBasicDetails';
import ShareModal from '../../../components/ShareModal';
import ProductImageSlider from './ProductImageSlider'
import ProductIconCard from './ProductIconCard';
import ProductDetailCard from './ProductDetailCard';
import ProductSoldByCard from './ProductSoldByCard';



const ProductDetail = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);
    const batchicon = useSelector(state => state.cart.BatchIcon);



    const { item } = route.params;
    const { catdataobj } = route.params;

    const [showSize, setShowSize] = useState(false);
    const [imageurlData, setimageurlData] = useState();

    const [ItemCategoryId, setItemCategoryId] = useState();
    const [modalDescription, setModalDescription] = useState(false);
    const [nameData, setnameData] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();



    let ShareproductImagesUrl = [];
    let productImagesUrl = [];





    for (const key in item.productimages) {
        productImagesUrl.push(baseUrl.url + 'api/download?privateUrl=' + item.productimages[key].privateUrl);
    }


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Iconic

                        name='search-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => console.log('helgtylo')} />
                    <Iconic
                        style={{ marginLeft: wp('2.5%') }}
                        name='heart-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => navigation.navigate('Wish')} />
                    <View>
                        <Badge containerStyle={{ position: 'absolute', top: -9, right: 1, zIndex: 1 }} value={batchicon} status="error" />
                        <Iconic
                            style={{ marginLeft: wp('2.5%'), marginRight: wp('2.5%') }}
                            name='cart-outline'
                            type='font-awesome'
                            size={23}
                            color={color.blue}

                            onPress={() => navigation.navigate('Cart')} />
                    </View>
                </View>
            ),

        });
    }, [navigation, batchicon]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(CartAction.fetchCart(userdata.userData._id))
        });


    }, [dispatch, batchicon]);

    const toggleModal = useCallback(
        () => {

            setShowSize(!showSize)
        }, [showSize]);

    const toggleModalVisibility = useCallback(
        () => {

            setModalVisible(false);
        }, []);


    const toogleShareModal = useCallback(
        (imageurl, name, itemCatId) => {

            ShareproductImagesUrl = [];
            for (var key in imageurl) {
                ShareproductImagesUrl.push(imageurl[key].privateUrl);
            }

            setimageurlData(ShareproductImagesUrl);
            setnameData(name);
            setItemCategoryId(itemCatId);
            setModalVisible(!isModalVisible);
        }, []);


    const showSizeFilter = useCallback(
        () => {
            setShowSize(true)
        }, []);

    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                bounces={true}

            >

                <ShareModal shareOthers={true} toggleModalVisibility={toggleModalVisibility} ItemCategoryId={ItemCategoryId} nameData={nameData} isModalVisible={isModalVisible} imageurlData={imageurlData} />

                <View style={styles.container}>
                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1.3%') }}>

                        <ProductImageSlider productImagesUrl={productImagesUrl} />
                        <ProductBasicDetails item={item} catdataobj={catdataobj} />

                        <TouchableWithoutFeedback onPress={() => toogleShareModal(item.productimages, item.description, item.itemCategoryId)}>
                            <View style={{ marginBottom: hp('3%'), marginHorizontal: wp('5%'), alignItems: 'center', paddingVertical: hp('1.5%'), marginTop: hp('2%'), borderRadius: 8, borderWidth: 0.8, borderColor: color.blue }}>
                                <Text style={{ color: color.blue, fontWeight: 'bold' }}>SHARE NOW</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Card>


                    <ProductDetailCard description={item.description} />
                    <ProductIconCard />

                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('8%'), marginTop: hp('1.3%') }}>

                        <View style={{ backgroundColor: color.gray, height: hp('5%'), paddingLeft: 20, justifyContent: 'center' }}>
                            <Text>CATALOG REVIEWS</Text>

                        </View>
                        <View style={{ marginTop: hp('2%'), paddingLeft: 20 }}>
                            <Text style={{ fontSize: 11 }}>NO REVIEWS HAS BEEN ADDED YET</Text>
                        </View>

                    </Card>
                    <ProductSoldByCard suplierName={item.SupplierId.BuisnessName} />

                    <ProductSizeFilter item={item} catdataobj={catdataobj} toggleModal={toggleModal} showSize={showSize} />

                </View>

            </ScrollView>

            <View style={styles.customButton}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => showSizeFilter()}>
                        <View style={{ borderWidth: 1, borderColor: color.blue, flexDirection: 'row', paddingVertical: hp('1.2%'), flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="cart-outline" size={20} color={color.blue} />
                            <Text style={{ color: color.blue, marginLeft: wp('1.5%') }}>ADD TO CART</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toogleShareModal(item.productimages, item.description, item.itemCategoryId)}>
                        <View style={{ flexDirection: 'row', paddingVertical: hp('1.2%'), flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="share-variant" size={20} color='#fff' />
                            <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>SHARE NOW</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    customButton: {

        paddingVertical: 0,
        width: '100%',

        position: 'absolute',
        bottom: 0
    }
});

export default ProductDetail;
