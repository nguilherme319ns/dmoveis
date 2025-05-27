import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { Card, Title, Text, Paragraph, Badge } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${idProduto}`)
      .then(response => setProduto(response.data))
      .catch(error => console.error(error));
  }, [idProduto]);

  if (!produto) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      
      <Card style={styles.card}>
        <Card.Cover source={{ uri: produto.thumbnail }} style={styles.image} />
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>{produto.title}</Title>
            <Badge style={styles.badge}>🔥 ESSENCIAL</Badge>
          </View>

          <Paragraph style={styles.description}>{produto.description}</Paragraph>

          <Text style={styles.label}>Preço</Text>
          <Text style={styles.price}>R$ {produto.price}</Text>

          <Text style={styles.label}>Marca</Text>
          <Text style={styles.info}>{produto.brand}</Text>

          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.info}>{produto.category}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
  },
  content: {
    padding: 12,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e63946',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  image: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
  },
  badge: {
    backgroundColor: '#ff5c5c',
    color: '#000',
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e63946',
  },
  info: {
    color: '#ddd',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    color: '#fff',
    fontSize: 18,
  },
});
