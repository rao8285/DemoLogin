import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { login, isLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {},
  );

  const validate = () => {
    let valid = true;
    let newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'E-mail is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid e-mail';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        await login(email, password);
        setEmail('');
        setPassword('');
        navigation.replace('Home');
      } catch (error) {
        Alert.alert('Login Failed', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#fff" // Android only
        barStyle="dark-content" // Dark icons/text
      />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={text => {
          setEmail(text);
          setErrors(prev => ({ ...prev, email: undefined }));
        }}
        placeholder="Enter your email"
        placeholderTextColor="#A1A1A1"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          styles.input,
          errors.email && { borderColor: 'red' }, // red border if error
        ]}
      />

      {errors.email && (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: verticalScale(10),
            marginTop: 5,
            gap: 5,
            alignItems: 'center',
            bottom: 5,
          }}
        >
          <Image
            source={require('../assets/info.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.errorText}>{errors.email}</Text>
        </View>
      )}

      <Text style={styles.label}>Password</Text>
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
          placeholder="Enter your password"
          placeholderTextColor="#A1A1A1"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            style={{ width: 20, height: 20 }}
            source={
              showPassword
                ? require('../assets/view.png')
                : require('../assets/hide.png')
            }
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: verticalScale(10),
            marginTop: 5,
            gap: 5,
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/info.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.errorText}>{errors.password}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.googleText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '20@s',
    paddingTop: '50@vs',
  },
  title: {
    fontSize: '24@ms',
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: '40@vs',
  },
  label: {
    fontSize: '14@ms',
    color: '#1E1E1E',
    marginBottom: '5@vs',
  },
  input: {
    height: '45@vs',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: '10@s',
    paddingHorizontal: '15@s',
    marginBottom: '5@vs',
    fontSize: '14@ms',
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: '10@s',
    paddingHorizontal: '15@s',
    height: '45@vs',
    marginBottom: '5@vs',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: '14@ms',
    color: '#000',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: '40@vs',
  },
  forgotText: {
    fontSize: '12@ms',
    color: '#007AFF',
  },
  loginButton: {
    backgroundColor: '#2E8B57',
    height: '48@vs',
    borderRadius: '25@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30@vs',
  },
  loginText: {
    color: '#fff',
    fontSize: '16@ms',
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#7E7E7E',
    marginBottom: '20@vs',
    fontSize: '12@ms',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: '25@s',
    height: '48@vs',
    paddingHorizontal: '20@s',
    justifyContent: 'center',
  },
  googleIcon: {
    width: '18@s',
    height: '18@s',
    marginRight: '10@s',
  },
  googleText: {
    fontSize: '14@ms',
    color: '#000',
  },
  errorText: {
    color: '#D12E34',
    fontSize: '12@ms',
  },
});
