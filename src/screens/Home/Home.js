import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles, theme } from './HomeStyles';
import { logoutUser } from '../../api/api';

const Home = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => logoutUser(navigation) },
      ],
      { cancelable: false }
    );
  };

  const categories = [
    { id: 1, title: 'Plumbers', icon: 'pipe' },
    { id: 2, title: 'Electricians', icon: 'flash' },
    { id: 3, title: 'Carpenters', icon: 'hammer' },
    { id: 4, title: 'Mechanics', icon: 'wrench' },
    { id: 5, title: 'Painters', icon: 'format-paint' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Homeowner',
      text: 'Found a skilled electrician within hours. Excellent service!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Smith',
      role: 'Business Owner',
      text: 'The app made it easy to find reliable workers for our renovation project.',
      rating: 5,
    },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Icon name={item.icon} size={32} color={theme.primary} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.headerBg} barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name="arrow-back-ios" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BestoWorkers</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="account" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Hero Section */}
        <Animated.View style={[styles.hero, { opacity: fadeAnim }]}>
          <Text style={styles.heroTitle}>Find Skilled Workers Easily</Text>
          <Text style={styles.heroSubtitle}>
            Connect with verified professionals for your project needs
          </Text>
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.primary }]}>
              <Text style={styles.ctaButtonText}>Find Workers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.accent }]} onPress={() => navigation.navigate("RegisterWorker")}>
              <Text style={styles.ctaButtonText}>Register as Worker</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            {['Search', 'Connect', 'Hire'].map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepIcon}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.benefitsContainer}>
            {['Verified Professionals', 'Quick Hiring', 'Secure Payments'].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Icon name="check-circle" size={24} color={theme.primary} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Testimonials</Text>
          <View style={styles.testimonialContainer}>
            {testimonials.map((testimonial, index) => (
              <Animated.View
                key={testimonial.id}
                style={[
                  styles.testimonialCard,
                  {
                    opacity: activeTestimonialIndex === index ? 1 : 0,
                    display: activeTestimonialIndex === index ? 'flex' : 'none',
                  },
                ]}
              >
                <View style={styles.testimonialHeader}>
                  <View style={styles.testimonialAvatar}>
                    <Icon name="account" size={24} color={theme.primary} />
                  </View>
                  <View>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                  </View>
                </View>
                <Text style={styles.testimonialText}>{testimonial.text}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="star" size={16} color={theme.secondary} />
                  ))}
                </View>
              </Animated.View>
            ))}
            <View style={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.testimonialDot,
                    {
                      backgroundColor:
                        activeTestimonialIndex === index ? theme.primary : theme.secondary,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: theme.text }]}>
          <View style={styles.footerLinks}>
            {['About', 'Contact', 'Privacy', 'Terms'].map((link, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.footerLink}>{link}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.socialIcons}>
            {['facebook', 'twitter', 'instagram'].map((platform, index) => (
              <TouchableOpacity key={index} style={styles.socialIcon}>
                <Icon name={platform} size={24} color={theme.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;