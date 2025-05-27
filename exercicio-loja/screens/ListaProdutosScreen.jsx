import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { Card, Text, Title, Button, Badge } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoria}`)
      .then(response => setProdutos(response.data.products))
      .catch(error => console.error(error));
  }, [categoria]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('Produto', { idProduto: item.id })}>
        <Card.Cover source={{ uri: item.thumbnail }} style={styles.cardImage} />
      </TouchableOpacity>

      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{item.title}</Title>
          {item.price < 100 && (
            <Badge style={styles.badge}>🔥 Drop exclusivo</Badge>
          )}
        </View>
        <Text style={styles.price}>R$ {item.price}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Produto', { idProduto: item.id })}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Ver mais
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c1c',
    marginVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e63946',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 180,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
  },
  badge: {
    backgroundColor: '#ff5c5c',
    color: '#000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e63946',
    marginTop: 6,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#111',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
