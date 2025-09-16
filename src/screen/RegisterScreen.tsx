

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
const RegisterScreen: React.FC = () => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      // TODO: colocar a logica de cadastro do firebase aqui
      //*await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! (Lógica Firebase a ser implementada)');
      console.log('Cadastro com:', email, password);
      // navigation.goBack(); // ou navegar para LoginScreen
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message || 'Ocorreu um erro ao tentar cadastrar.');
      console.error('Erro de Cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TaskFlow</Text>
      <Text style={styles.welcomeText}>Crie sua conta!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLinkButton}>
        <Text style={styles.loginLinkText}>Já tem uma <Text style={styles.loginLink}>conta?</Text></Text>
        {/* TODO: Adicionar navegação para LoginScreen aqui */}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C2B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#2E2E4A',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  registerButton: {  
    width: '100%',
    backgroundColor: '#00C899',
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkButton: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#ccc',
    fontSize: 16,
  },
  loginLink: {
    color: '#00C899',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;