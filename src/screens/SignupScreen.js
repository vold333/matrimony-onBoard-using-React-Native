import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignupScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [profileType, setProfileType] = useState(null);
  const [gender, setGender] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>While we find Matches for you</Text>
      <Text style={styles.subtitle}>Let's set up your account</Text>

      {/* Profile Type Dropdown */}
      <View style={{ zIndex: openProfile ? 1000 : 0, paddingBottom: 15 }}>
        <DropDownPicker
          open={openProfile}
          value={profileType}
          items={[
            { label: 'Self', value: 'self' },
            { label: 'Son/Daughter', value: 'child' },
            { label: 'Relative', value: 'relative' },
          ]}
          setOpen={setOpenProfile}
          setValue={setProfileType}
          placeholder="Matrimony Profile for"
          style={{ marginBottom: 10 }}
          onClose={() => setOpenProfile(false)}
        />
      </View>

      {/* Gender Dropdown */}
      <View style={{ zIndex: openGender ? 1000 : 0, paddingBottom: 15 }}>
        <DropDownPicker
          open={openGender}
          value={gender}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          setOpen={setOpenGender}
          setValue={setGender}
          placeholder="Gender"
          onClose={() => setOpenGender(false)}
        />
      </View>

      {/* Mobile Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>
      <Text style={styles.hintText}>OTP will be sent to this number</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Create Password"
        secureTextEntry={!isPasswordVisible}  // Toggle password visibility
        value={password}
        maxLength={10}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Image
          source={
            isPasswordVisible
              ? require('./../assets/view.png')  // Add your own icon or path
              : require('./../assets/hidden.png') // Add your own icon or path
          }
          style={styles.eyeIcon}
        />
      </TouchableOpacity>
    </View>

      {/* Terms & Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          tintColors={{ true: 'red', false: 'red' }}
        />
        <Text style={styles.checkboxText}>
          By clicking register free, I agree to the T&C and Privacy policy
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('OTP')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      {/* Login Text */}
      <View style={styles.resendContainer}>
      <Text style={styles.resendText}>Existing user? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.resendOtpText}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    paddingBottom: 5,
    textAlign: 'left',
  },
  subtitle:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  registerButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  hintText:{
    color:"black",
    marginBottom: 10
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 15,
    marginTop: 10,
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
});
