import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';

import { Card, ListItem, Badge, withBadge } from 'react-native-elements';




const ProductDetailCard = ({ description }) => {


    return (

        <View style={styles.container}>

            <Card containerStyle={styles.cardContainer}>
                <View style={styles.viewContaner}>
                    <Text>PRODUCT DETAILS</Text>

                </View>
                <View style={{ padding: 20 }}>
                    <Text>{description}</Text>
                </View>
            </Card>

        </View>


    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        marginTop: hp('1.3%')
    },
    viewContaner: {
        backgroundColor: color.gray,
        height: hp('5%'),
        paddingLeft: 20,
        justifyContent: 'center'
    }

});

export default React.memo(ProductDetailCard);
