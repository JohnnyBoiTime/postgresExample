/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import axios from 'axios';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type User = {
  user_id: number;
  username: string;
  email: string;
  account_created: string;
  password: string;
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const ip = '192.168.50.28';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const response = await axios.get(`http://${ip}:3000/users`);
        console.log(response.data);
        setUsers(response.data)
        console.log("CONNECTED!");
      } catch (error) {
        console.error("ERROR! Could not fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      style={backgroundStyle}>
        <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,

        }}>
            <Text style={styles.header}> Users list</Text>
            {loading ? (
              <Text> Loading...</Text>
            ) : (
              <FlatList
              data={users}
              keyExtractor={(item) => item.user_id.toString()}
              renderItem={ ({item}) => (
                  <View style={styles.userContainer}>
                    <Text style={styles.userName}> {item.username}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                  </View>
              )}
              />
            )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;
