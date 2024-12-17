import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [counter]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to next input
    if (text && index < otp.length - 1) {
      focusNextInput(index + 1);
    }
  };

  const focusNextInput = (index) => {
    if (index < otp.length) {
      inputRefs[index].focus();
    }
  };

  const handleResendOtp = () => {
    setCounter(60);
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      // Handle OTP verification logic here
      console.log('OTP Verified:', otpCode);
    } else {
      console.log('Please enter the full OTP');
    }
  };

  const inputRefs = [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Verification</Text>
      <Text style={styles.description}>Please verify your mobile number and say why we need mobile verification</Text>
      <Text style={styles.otpTitle}>OTP Verification</Text>
      <Text style={styles.otpDescription}>We have sent a verification code to 6369039520</Text>
      
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            ref={(ref) => (inputRefs[index] = ref)}
          />
        ))}
      </View>


      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP? </Text>
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resendOtpText}>Resend OTP ({counter}s)</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity onPress={handleVerify} style={styles.buttonContainer}>
        <Text style={styles.verify}>Verify</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 20,
    fontSize: 16,
    
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign:"center"
  },
  otpDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign:"center"
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    borderColor: "red",
  },
  resendContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  
  },
  resendText: {
    fontSize: 15,
    color: "black"
  },
  resendOtpText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer:{
    backgroundColor: "#ff5a5f",
    padding: 15,
    marginTop: 10
  },
  verify:{
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
});

export default OTPVerificationScreen;
