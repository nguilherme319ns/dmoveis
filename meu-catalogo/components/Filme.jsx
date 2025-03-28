import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const Filme = ({ nome, ano, diretor, tipo, capa }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.container,
      {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }
    ]}>
      <Image source={{ uri: capa }} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{nome}</Text>
        <Text>Ano: {ano}</Text>
        <Text>Diretor: {diretor}</Text>
        <Text>Gênero: {tipo}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 3,
  },
  capa: {
    width: 100,
    height: 150,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  info: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
});

export default Filme;