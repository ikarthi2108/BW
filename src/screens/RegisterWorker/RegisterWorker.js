import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView, // Import KeyboardAvoidingView
  Platform, // Import Platform
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'; // Import SafeAreaView
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'react-native-image-picker';
import styles from './RegisterWorkerStyles'; // Import the styles
import JobRoleDropdown from '../../components/JobRoleDropdown'; // Import the new component

const RegisterWorker = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [secondaryMobile, setSecondaryMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [jobRole, setJobRole] = useState(null); // Add state for job role
  const [experience, setExperience] = useState(null);
  const [workAvailability, setWorkAvailability] = useState(null);

  // Dropdown States
  const [openGender, setOpenGender] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openJobTitle, setOpenJobTitle] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openWorkAvailability, setOpenWorkAvailability] = useState(false);
  const [gender, setGender] = useState(null);
  const [district, setDistrict] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const districtOptions = [
    {label: 'Tirupur', value: 'tirupur'},
    {label: 'Coimbatore', value: 'coimbatore'},
    {label: 'Erode', value: 'erode'},
  ];

  const jobTitleOptions = [
    {label: 'Household Services', value: 'household_services'},
    {
      label: 'Mechanics & Vehicle Services',
      value: 'mechanics_vehicle_services',
    },
    {
      label: 'Construction & Skilled Labor',
      value: 'construction_skilled_labor',
    },
    {label: 'Textile & Weaving Industry', value: 'textile_weaving_industry'},
    {label: 'Hotel & Catering Services', value: 'hotel_catering_services'},
    {label: 'Sales & Retail', value: 'sales_retail'},
    {label: 'Medical & Hospital Services', value: 'medical_hospital_services'},
    {label: 'Security & Maintenance', value: 'security_maintenance'},
    {label: 'Logistics & Delivery', value: 'logistics_delivery'},
    {label: 'Beauty & Grooming', value: 'beauty_grooming'},
    {label: 'Teaching & Education', value: 'teaching_education'},
    {label: 'Banking & Office Jobs', value: 'banking_office_jobs'},
    {label: 'North Indian Workers', value: 'north_indian_workers'},
    {
      label: 'Village & Agricultural Workers',
      value: 'village_agricultural_workers',
    },
  ];

  const experienceOptions = [
    {label: '0-2 Years', value: '0-2'},
    {label: '2-5 Years', value: '2-5'},
    {label: '5-8 Years', value: '5-8'},
    {label: '8-10 Years', value: '8-10'},
    {label: '10+ Years', value: '10+'},
  ];

  const workAvailabilityOptions = [
    {label: 'Full-time', value: 'fulltime'},
    {label: 'Part-time', value: 'parttime'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedMobile = await AsyncStorage.getItem('mobile');

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedMobile) setMobile(storedMobile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Image Picker Function
  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Add offset if needed
      >
        <ScrollView
          style={[styles.container, {paddingBottom: 100}]} // Add paddingBottom
          contentContainerStyle={{flexGrow: 1}} // Ensure content can grow to fill space
        >
          {/* Profile Picture Selector */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {profileImage ? (
              <Image source={{uri: profileImage}} style={styles.profileImage} />
            ) : (
              <Text style={styles.imageText}>Select Profile Picture</Text>
            )}
          </TouchableOpacity>

          {/* Personal Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Secondary Mobile (Optional)"
              value={secondaryMobile}
              onChangeText={setSecondaryMobile}
              keyboardType="phone-pad"
            />

            {/* Gender Dropdown */}
            <View style={{zIndex: openGender ? 5000 : 3000}}>
              <DropDownPicker
                open={openGender}
                value={gender}
                items={genderOptions}
                setOpen={setOpenGender}
                setValue={setGender}
                placeholder="Select Gender"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
              />
            </View>

            {/* District Dropdown */}
            <View style={{zIndex: openDistrict ? 4000 : 2000}}>
              <DropDownPicker
                open={openDistrict}
                value={district}
                items={districtOptions}
                setOpen={setOpenDistrict}
                setValue={setDistrict}
                placeholder="Select District"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
              />
            </View>
          </View>

          {/* Work Details */}
          <View style={[styles.section, styles.workDetailsSection]}>
  <Text style={styles.sectionTitle}>Work Details</Text>
  {/* Job Title Dropdown */}
  <View style={{ zIndex: openJobTitle ? 1000 : 0, maxHeight: 700, overflowY: 'auto' }}>
    <DropDownPicker
      open={openJobTitle}
      value={jobTitle}
      items={jobTitleOptions}
      setOpen={setOpenJobTitle}
      setValue={setJobTitle}
      placeholder="Select Job Title"
      style={styles.dropdown}
      dropDownContainerStyle={{ maxHeight: 700, overflowY: 'auto' }} // Adding inline styles for scrolling
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
    />
  </View>
            

            {/* Job Role Dropdown - Conditionally Rendered */}
            {jobTitle ? <JobRoleDropdown jobTitle={jobTitle} /> : null}

            {/* Experience Dropdown */}
            <View style={{zIndex: openExperience ? 2000 : 800}}>
              <DropDownPicker
                open={openExperience}
                value={experience}
                items={experienceOptions}
                setOpen={setOpenExperience}
                setValue={setExperience}
                placeholder="Select Experience"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
              />
            </View>

            {/* Work Availability Dropdown */}
            <View style={{zIndex: openWorkAvailability ? 1000 : 700}}>
              <DropDownPicker
                open={openWorkAvailability}
                value={workAvailability}
                items={workAvailabilityOptions}
                setOpen={setOpenWorkAvailability}
                setValue={setWorkAvailability}
                placeholder="Select Work Availability"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Skills (Comma separated)"
            />
            <TextInput
              style={styles.input}
              placeholder="Expected Salary"
              keyboardType="numeric"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterWorker;
