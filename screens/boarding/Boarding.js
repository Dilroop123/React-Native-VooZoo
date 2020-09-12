

import React from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmsRetriever from 'react-native-sms-retriever';
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../../store/actions/UserAction';

const Boarding = ({ navigation }) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user.UserData);

  const _onPhoneNumberPressed = async () => {

    let phoneNumber = await SmsRetriever.requestPhoneNumber();
    console.log(phoneNumber);
    //dispatch(UserAction.createUser(phoneNumber))


  };


  const _onSmsListenerPressed = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          //  console.log(event.message);
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      // console.log(JSON.stringify(error));
    }
  };


  const generateOtp = async () => {

    // const result = _onPhoneNumberPressed();
    let phoneNumber = await SmsRetriever.requestPhoneNumber();
    console.log(phoneNumber);
    dispatch(UserAction.createUser(phoneNumber))
    navigation.navigate('GenerateOtp')
  }


  return (

    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Background.png')} style={styles.image}>

        <View style={styles.subcontainer}>
          <Text style={styles.textearn}>Earn from Home {"\n"}with Zero Investment</Text>
        </View>

      </ImageBackground>

      <TouchableWithoutFeedback onPress={() => generateOtp()}>
        <View style={styles.customButton}>

          <Text style={{ color: 'white', fontSize: 16 }}>Continue</Text>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  image: {
    flex: 1,
    flexDirection: 'row'
  },
  subcontainer: {
    flex: 1,
    marginTop: hp('18%'),
    marginLeft: wp('4%')
  },
  text: {
    color: color.blue,
    fontWeight: "bold",
    textAlign: 'center'
  },
  customButton: {
    backgroundColor: color.blue,
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  textearn: {
    color: color.blue,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  }
});

export default Boarding;
