// components/GradientButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={['#E95950', '#BC2C8D']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        borderRadius: 8,
        padding: 14,
      }}>
      <Text style={{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
      }}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default GradientButton;