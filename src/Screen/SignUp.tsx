import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const { signup, isLoading } = useContext(AuthContext);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {},
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      await signup(
        `${firstName.trim()} ${lastName.trim()}`,
        email.trim(),
        password,
      );
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      Alert.alert('Success', 'Account created! You can now login.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Register</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: scale(8) }}>
            <TextInput
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setErrors(prev => ({ ...prev, firstName: undefined }));
              }}
              placeholder="First Name"
              placeholderTextColor="#A1A1A1"
              style={[styles.input, errors.firstName && { borderColor: 'red' }]}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={{ flex: 1, marginLeft: scale(8) }}>
            <TextInput
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setErrors(prev => ({ ...prev, lastName: undefined }));
              }}
              placeholder="Last Name"
              placeholderTextColor="#A1A1A1"
              style={[styles.input, errors.lastName && { borderColor: 'red' }]}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>
        </View>

        <TextInput
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: undefined }));
          }}
          placeholder="E-mail"
          placeholderTextColor="#A1A1A1"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, errors.email && { borderColor: 'red' }]}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View
          style={[
            styles.passwordContainer,
            errors.password && { borderColor: 'red' },
          ]}
        >
          <TextInput
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors(prev => ({ ...prev, password: undefined }));
            }}
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              style={styles.eyeIcon}
              source={
                showPassword
                  ? require('../assets/view.png')
                  : require('../assets/hide.png')
              }
            />
          </TouchableOpacity>
        </View>
       
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <View
          style={[
            styles.passwordContainer,
            errors.confirmPassword && { borderColor: 'red' },
          ]}
        >
          <TextInput
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setErrors(prev => ({ ...prev, confirmPassword: undefined }));
            }}
            placeholder="Confirm Password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry={!showConfirmPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Image
              style={styles.eyeIcon}
              source={
                showConfirmPassword
                  ? require('../assets/view.png')
                  : require('../assets/hide.png')
              }
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>

        

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '20@s',
  },
  backButton: {
    width: '36@s',
    height: '36@s',
    borderRadius: '18@s',
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10@vs',
  },
  backIcon: {
    width: '20@s',
    height: '20@s',
    resizeMode: 'contain',
  },
  title: {
    fontSize: '22@ms',
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: '30@vs',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '15@vs',
  },
  input: {
    height: '45@vs',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: '10@s',
    paddingHorizontal: '15@s',
    fontSize: '14@ms',
    color: '#000',
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: '10@s',
    paddingHorizontal: '15@s',
    height: '45@vs',
    marginTop: '10@vs',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: '14@ms',
    color: '#000',
  },
  eyeIcon: {
    width: '20@s',
    height: '20@s',
  },
  helperText: {
    fontSize: '10@ms',
    color: '#7E7E7E',
    marginTop: '5@vs',
    marginBottom: '10@vs',
  },
  createButton: {
    backgroundColor: '#2E8B57',
    height: '48@vs',
    borderRadius: '25@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@vs',
  },
  createText: {
    color: '#fff',
    fontSize: '16@ms',
    fontWeight: '600',
  },
  termsText: {
    fontSize: '12@ms',
    color: '#7E7E7E',
    textAlign: 'center',
    marginTop: '15@vs',
  },
  link: {
    color: '#007AFF',
  },
  errorText: {
    color: 'red',
    marginTop: '3@vs',
    fontSize: '12@ms',
  },
});
