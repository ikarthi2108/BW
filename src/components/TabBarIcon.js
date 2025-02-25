// src/components/TabBarIcon.js
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBarIcon = ({ focused, name, color }) => {
  return <Icon name={name} size={24} color={color} />;
};

export default TabBarIcon;