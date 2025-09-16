
import 'react-native-gesture-handler'; 
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';


import  { auth } from './src/services/firebaseconfig';
import { onAuthStateChanged, User } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C2B' }}>
        <ActivityIndicator size="large" color="#00C899" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" /> {}
      <Stack.Navigator screenOptions={{ headerShown: false }}> {}
        {user ? (
          <Stack.Screen name="Home" component={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C2B' }}>
              <Text style={{ color: '#fff', fontSize: 24 }}>Bem-vindo, {user.email}!</Text>
              <Text style={{ color: '#ccc', marginTop: 10 }}>(Tela Principal do App)</Text>
            </View>
          )} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});