// HomeScreen.js

import React from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Title, Button, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const backgroundImage = {
  uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80',
};

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} blurRadius={4}>
      <StatusBar barStyle="light-content" />

      <View style={{ height: insets.top, backgroundColor: 'rgba(20,0,40,0.8)' }} />

      <View style={styles.overlay}>
        <Title style={styles.title}>Bem-vindo ao HotelLUXOR</Title>
        <Text style={styles.subtitle}>
          Gerencie hóspedes, serviços, funcionarios e muito mais.
        </Text>

        <View style={styles.buttonsContainer}>
          {[
            { label: 'Cadastrar Hóspede', screen: 'Cadastrar Hóspede' },
            { label: 'Hóspedes Cadastrados', screen: 'Hóspedes Cadastrados' },
            { label: 'Serviços', screen: 'Serviços' },
            { label: 'Cadastrar Funcionarios', screen: 'Cadastrar Funcionario' },
            { label: 'Funcionarios Cadastrados', screen: 'Funcionarios Cadastrados' },
            { label: 'Dashboard', screen: 'Dashboard' },
          ].map(({ label, screen }) => (
            <Button
              key={screen}
              mode="contained"
              onPress={() => navigation.navigate(screen)}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.label}
              rippleColor="rgba(98,0,238,0.3)"
            >
              {label}
            </Button>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,0,40,0.85)', // deep purple translucent overlay
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#d1c4ff',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: '#7e57c2',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#b39ddb',
    fontSize: 18,
    marginBottom: 48,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    borderRadius: 14,
    backgroundColor: '#7e57c2',
    shadowColor: '#7e57c2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 12,
  },
  buttonContent: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ede7f6',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
