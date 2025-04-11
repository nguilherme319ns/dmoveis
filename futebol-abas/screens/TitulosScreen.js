import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const titulos = [
  {
    nome: "Campeonato Brasileiro",
    anos: [1977, 1986, 1991, 2006, 2007, 2008],
  },
  {
    nome: "Copa Libertadores da América",
    anos: [1992, 1993, 2005],
  },
  {
    nome: "Mundial de Clubes",
    anos: [1992, 1993, 2005],
  },
  {
    nome: "Copa do Brasil",
    anos: [2023],
  },
  {
    nome: "Campeonato Paulista",
    anos: [1931, 1943, 1945, 1946, 1948, 1949, 1953, 1957, 1970, 1971, 1975, 1980, 1981, 1985, 1987, 1989, 1991, 1992, 1998, 2000, 2005, 2021],
  },
];

const TitulosScreen = () => {
  return (
    <FlatList
      data={titulos}
      keyExtractor={(item) => item.nome}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.nome} />
          <Card.Content>
            <Text>Anos: {item.anos.join(', ')}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default TitulosScreen;
