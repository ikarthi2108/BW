import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import GradientButton from '../components/GradientButton';
import Icon from 'react-native-vector-icons/Feather';
import { verifyOtp } from '../api/api';

const EmailVerification = ({ navigation, route }) => {
  const { email } = route.params;
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleVerifyOtp = async () => {
    const otp = code.join('');

    if (otp.length < 4) {
      Alert.alert('Error', 'Please enter a 4-digit OTP');
      return;
    }

    try {
      const response = await verifyOtp(email, otp);
      Alert.alert('Success', response.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid OTP');
    }
  };

  const handleTextChange = (text, index) => {
    if (text.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="star" size={24} color="white" style={styles.star} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Check your email✨</Text>
        <Text style={styles.subtitle}>
          We sent a verification code to {email}
        </Text>
      </View>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleTextChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={index === 0}
            textAlign="center"
          />
        ))}
      </View>

      <GradientButton title="Verify email" onPress={handleVerifyOtp} />

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the email? </Text>
        <TouchableOpacity>
          <Text style={styles.resendLink}>Click to resend</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#666" />
        <Text style={styles.backText}>Back to log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  star: {
    marginTop: 40,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#1C1C1E',
    marginHorizontal: 6,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#666',
  },
  resendLink: {
    color: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  backText: {
    color: '#666',
    marginLeft: 8,
  },
});