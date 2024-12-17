import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button, Alert } from 'react-native';

// Helper function to call API
const loginApi = async (profileId, password) => {
  try {
    const response = await fetch('https://matrimonyapi.rainyseasun.com/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: profileId,
        password: password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const LoginScreen = ({ navigation }) => {
  const [profileId, setProfileId] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Validate fields
    if (!profileId || !password) {
      Alert.alert('Validation Error', 'Both Profile ID and Password are required.');
      return;
    }

    const data = await loginApi(profileId, password);

    if (data && data.status === 1) {
      // Login successful, show the response data in modal
      setUserData(data);
      setModalVisible(true);
    } else {
      // Login failed, show error message
      setError(data ? data.message : 'Something went wrong.');
      Alert.alert('Login Failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subHeading}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Profile ID"
        value={profileId}
        maxLength={10}
        onChangeText={setProfileId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        maxLength={10}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity
        style={styles.phoneLoginButton}
        onPress={() => navigation.navigate('OTP')}>
        <Text style={styles.phoneLoginButtonText}>Login With Phone Number</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Signup')}>
          Register Now
        </Text>
      </Text>

      {/* Modal to display user data on successful login */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login Successful</Text>
            <Text>Profile ID: {userData?.profile_id}</Text>
            <Text>Gender: {userData?.gender}</Text>
            <Text>Height: {userData?.height}</Text>
            <Text>Marital Status: {userData?.marital_status}</Text>
            <Text>Plan ID: {userData?.cur_plan_id}</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  subHeading: {
    fontSize: 21,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 8,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'left',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 14,
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 15,
  },
  phoneLoginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneLoginButtonText: {
    color: '#f44336',
    fontSize: 16,
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
  signupLink: {
    color: '#f44336',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeModalButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 15,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
