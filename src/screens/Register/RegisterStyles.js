import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  form: {
    marginBottom: 32,
  },
  passwordHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hintText: {
    color: '#666',
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxText: {
    color: '#666',
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 14,
    marginTop: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  footerLink: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default styles;