import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import GradientButton from '../../components/GradientButton';
import Icon from 'react-native-vector-icons/Feather';
import { loginUser } from '../../api/api';
import styles from './LoginStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    try {
      const response = await loginUser({ email, password, rememberMe });
      Alert.alert('Success', 'Login successful');
      navigation.navigate('HomeScreen'); // Navigate to home page
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://image.shutterstock.com/image-photo/image-260nw-2464318109.jpg' }}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Log in to your account✨</Text>
        <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>
      </View>

      <View style={styles.form}>
        <CustomInput
          icon="mail"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        
        <CustomInput
          icon="lock"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="white" />
            </TouchableOpacity>
          }
        />

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <Icon name={rememberMe ? 'check-square' : 'square'} size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember for 30 days</Text>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <GradientButton title="Log In" onPress={handleLogin} />

        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/icons/google.png')} style={styles.googleIcon} />
          <Text style={styles.socialButtonText}>Log in with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
