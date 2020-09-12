/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { useState, useEffect } from 'react';
import {
  Alert,
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

import NumericKeyboard from '../../components/NumericKeyboard';
import color from '../../style/color'
import { useSelector, useDispatch } from 'react-redux';
import * as CartAction from '../../store/actions/CartAction';
const isRTL = I18nManager.isRTL;


const VerifyOtp = ({ navigation }) => {

  const [pin, setPin] = useState('');




  const pressKeyboardButton = (keyboardButton) => () => {


    if (keyboardButton === 'backspace') {
      const Newpin = pin.slice(0, -1);
      setPin(Newpin);
      return;
    }



    if ((pin + keyboardButton).length > 4) {
      return;
    }
    setPin(pin + keyboardButton);

  };

  const submit = () => {
    console.log('submit handler');
    navigation.navigate('Gender');
  }

  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>
      {/*<StatusBar
          backgroundColor='#fff'
          barStyle="dark-content"
        />*/}

      <View style={styles.container}>
        <View style={styles.instructionContainer}>
          <Text style={{ fontWeight: 'bold' }}>Enter Verification Code</Text>
          <Text style={styles.instruction}>
            We have sent OTP on your number{'\n'}+15145492595
            </Text>

          <View style={styles.codeContainer}>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[0]}</Text>

            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[1]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[2]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[3]}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 70 }}>
          <Button
            onPress={submit}
            disabled={pin.length < 4}
            color={color.blue}
            style={{ borderRadius: 7 }}


            title={'Continue'.toUpperCase()}
          />
        </View>

        <NumericKeyboard
          actionButtonTitle="skip"
          onPress={pressKeyboardButton}
        />


      </View>
    </SafeAreaView>
  );
}
export default VerifyOtp;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    marginTop: 16,
    paddingHorizontal: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 48,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  digit: {
    fontWeight: '400',
    fontSize: 17,
  },
  buttonContainer: {
    width: '100%',
    marginHorizontal: 20
  },
});