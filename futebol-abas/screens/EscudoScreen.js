import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

const EscudoScreen = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>São Paulo FC</Title>
      <Image
        source={{ uri: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png' }}
        style={styles.escudo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    color: '#d32f2f',
  },
  escudo: {
    width: 200,
    height: 200,
  },
});

export default EscudoScreen;
