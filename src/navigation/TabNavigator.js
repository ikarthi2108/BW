import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home/Home';
import Categories from '../screens/Categories/Categories';
import Favorites from '../screens/Favorites/Favorites';
import Account from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help';
          }

          return (
            <View style={[styles.tabIconContainer, focused ? styles.activeTab : styles.inactiveTab]}>
              <TabBarIcon 
                focused={focused} 
                name={iconName} 
                color={color} 
                size={24} // Consistent icon size
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <LinearGradient
          colors={['#0F172A', '#3B82F6']} // Dark Navy to Bright Blue
          start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tabBarBackground}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarItemStyle: styles.tabBarItem,
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={Categories} 
        options={{ 
          tabBarLabel: 'Categories',
          tabBarItemStyle: styles.tabBarItem,
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{ 
          tabBarLabel: 'Favorites',
          tabBarItemStyle: styles.tabBarItem,
        }} 
      />
      <Tab.Screen 
        name="Account" 
        component={Account} 
        options={{ 
          tabBarLabel: 'Profile',
          tabBarItemStyle: styles.tabBarItem,
        }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    // bottom: Platform.OS === 'ios' ? 24 : 16, // Better bottom positioning
    height: 65, // Increased height for better touch targets
    borderRadius: 35,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    paddingHorizontal: 8,
  },
  tabBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
    letterSpacing: 0.2,
  },
  tabBarItem: {
    height: 70,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    width: 44,
    height: 44,
    marginBottom: 4,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
    marginBottom: 4,
  },
});

export default TabNavigator;