import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { AuthContext } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import AuthContextType from the appropriate location
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  console.log('Ddddd', usersList);
       
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await AsyncStorage.getItem('users');
      setUsersList(usersData ? JSON.parse(usersData) : []);
    };
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userContainer}>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/user.png')} style={styles.avatar} />
      </View>
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user?.name ?? 'User'}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await logout();
            navigation.replace('Login');
          }}
        >
          <Image
            source={require('../assets/logout.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={usersList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: verticalScale(10) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '60@vs',
    paddingHorizontal: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //
  },
  welcomeText: {
    color: '#000',
    fontSize: '18@ms',
    fontWeight: '600',
  },
  logoutButton: {
    width: '40@vs',
    height: '40@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@vs',
    backgroundColor: '#2E8B57',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: '20@ms',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10@ms',
    gap: '10@ms',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: '25@ms',
   
  },
  userName: {
    fontSize: '16@ms',
    fontWeight: '500',
    color: '#333',
  },
  imageWrapper: {
    width: '60@ms',
    height: '60@ms',
    backgroundColor: '#e0e0e0', // your background color
    borderRadius: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
