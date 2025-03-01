import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    maxheight: 8000,
  },
  


  dropdownContainer: {
    maxHeight: 500, // Adjust the height as needed
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  imagePicker: {
    marginLeft: 85,
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 130,
    borderRadius: 70,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 90,
  },
  imageText: {
    color: '#888',
  },
  dropdown: {
    marginBottom: 15,
  },
  workDetailsSection: {
    marginTop: 20,
  },
  submitButton: {
    borderRadius: 200,
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  jobRoleDropdown: {
    // Style for the JobRoleDropdown component
    marginBottom: 50,
  },
});

export default styles;
