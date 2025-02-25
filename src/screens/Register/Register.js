import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import GradientButton from '../../components/GradientButton';
import Icon from 'react-native-vector-icons/Feather';
import { registerUser } from '../../api/api';
import styles from './RegisterStyles';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [acceptNotifications, setAcceptNotifications] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !mobile || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Mobile number must be 10 digits');
      return;
    }

    const userData = {
      name,
      email,
      mobile,
      password,
      acceptNotifications,
    };

    try {
      const response = await registerUser(userData);
      Alert.alert('Success', response.message);

      // Navigate to Email Verification screen with the user's email
      navigation.navigate('EmailVerification', { email });
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  const handleCheckBoxToggle = () => {
    setAcceptNotifications(!acceptNotifications);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://image.shutterstock.com/image-photo/image-260nw-2464318109.jpg',
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <Text style={styles.title}>Create an account✨</Text>
          <Text style={styles.subtitle}>
            Welcome! Please enter your details.
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            icon="user"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            icon="mail"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            icon="phone"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />

          <CustomInput
            icon="lock"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.passwordHint}>
            <Icon
              name="check"
              size={16}
              color={password.length >= 8 ? '#00FF00' : '#666'}
            />
            <Text
              style={[
                styles.hintText,
                { color: password.length >= 8 ? '#00FF00' : '#666' },
              ]}>
              Must be at least 8 characters
            </Text>
          </View>

          {/* <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={handleCheckBoxToggle}>
              <Icon
                name={acceptNotifications ? 'check-square' : 'square'}
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>Remember me</Text>
          </View> */}

          <GradientButton title="Sign Up" onPress={handleSignUp} />

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;