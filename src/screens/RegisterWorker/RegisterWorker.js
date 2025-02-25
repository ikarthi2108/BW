import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "react-native-image-picker";

const RegisterWorker = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [secondaryMobile, setSecondaryMobile] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Dropdown States
  const [openGender, setOpenGender] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [gender, setGender] = useState(null);
  const [district, setDistrict] = useState(null);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const districtOptions = [
    { label: "Tirupur", value: "tirupur" },
    { label: "Coimbatore", value: "coimbatore" },
    { label: "Erode", value: "erode" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedMobile = await AsyncStorage.getItem("mobile");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedMobile) setMobile(storedMobile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Image Picker Function
  const pickImage = () => {
    let options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Selector */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Select Profile Picture</Text>
        )}
      </TouchableOpacity>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Mobile" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Secondary Mobile (Optional)" value={secondaryMobile} onChangeText={setSecondaryMobile} keyboardType="phone-pad" />

        {/* Gender Dropdown */}
        <View style={{ zIndex: 3000 }}>
          <DropDownPicker
            open={openGender}
            value={gender}
            items={genderOptions}
            setOpen={setOpenGender}
            setValue={setGender}
            placeholder="Select Gender"
            style={styles.dropdown}
          />
        </View>

        {/* District Dropdown */}
        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            open={openDistrict}
            value={district}
            items={districtOptions}
            setOpen={setOpenDistrict}
            setValue={setDistrict}
            placeholder="Select District"
            style={styles.dropdown}
          />
        </View>
      </View>

      {/* Work Details */}
      <View style={[styles.section, styles.workDetailsSection]}>
        <Text style={styles.sectionTitle}>Work Details</Text>
        <TextInput style={styles.input} placeholder="Job Title" />
        <TextInput style={styles.input} placeholder="Experience (Years)" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Skills (Comma separated)" />
        <TextInput style={styles.input} placeholder="Expected Salary" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Work Availability (Full-time/Part-time)" />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterWorker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  workDetailsSection: {
    backgroundColor: "#e3f2fd",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePicker: {
    alignSelf: "center",
    marginBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    color: "#007bff",
    fontSize: 12,
    textAlign: "center",
  },
});
