import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const categoriasStreetwear = [
  { slug: 'mens-shoes', nome: 'Tênis' },
  { slug: 'mens-shirts', nome: 'Camisetas' },
  { slug: 'mens-watches', nome: 'Relógios' },
  { slug: 'sunglasses', nome: 'Óculos' },
  { slug: 'tops', nome: 'Roupas Femininas' },
  { slug: 'womens-bags', nome: 'Bolsas Femininas' },
];

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false); // Simula carregamento se quiser futuramente

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produtos', { categoria: item.slug })}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.text}>{item.nome}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={categoriasStreetwear}
          keyExtractor={(item) => item.slug}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1c1c1c',
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e63946',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
