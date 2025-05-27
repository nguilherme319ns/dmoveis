import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        const categoriasComSlug = response.data.map(cat => ({
          name: cat.charAt(0).toUpperCase() + cat.slice(1),
          slug: cat
        }));
        setCategorias(categoriasComSlug);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produtos', { categoria: item.slug })}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardText}>{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // fundo escuro estiloso
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'System', // fonte padrão com bold dá o efeito desejado
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c1c',
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e63946', // vermelho streetwear
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f1f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
