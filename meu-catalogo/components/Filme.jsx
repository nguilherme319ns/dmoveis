import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Filme = ({ nome, ano, diretor, tipo, capa }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: capa }} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{nome}</Text>
        <Text>Ano: {ano}</Text>
        <Text>Diretor: {diretor}</Text>
        <Text>Gênero: {tipo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  capa: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Filme;