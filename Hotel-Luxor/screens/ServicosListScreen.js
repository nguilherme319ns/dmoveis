// ServicosListScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { List, ActivityIndicator, Divider, useTheme } from 'react-native-paper';

export default function ServicosListScreen() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const hotelKeywords = [
    'service', 'cleaning', 'spa', 'relax', 'massage',
    'food', 'restaurant', 'bar', 'room', 'pool', 'sauna',
    'concierge', 'laundry', 'breakfast', 'dining', 'gym'
  ];

  const fetchServicos = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const json = await res.json();
      const filtered = json.products.filter(product => {
        const text = (product.title + ' ' + product.category + ' ' + product.description).toLowerCase();
        return hotelKeywords.some(keyword => text.includes(keyword));
      });
      setServicos(filtered);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os serviços');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={servicos}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#2c2c2c' }} />}
        renderItem={({ item }) => (
          <List.Item
            style={styles.listItem}
            title={item.title}
            titleStyle={styles.title}
            description={`Preço: R$${item.price.toFixed(2)}`}
            descriptionStyle={styles.description}
            left={props => (
              <Image
                {...props}
                source={{ uri: item.thumbnail }}
                style={styles.image}
              />
            )}
          />
        )}
        contentContainerStyle={servicos.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <List.Subheader style={styles.emptyText}>Nenhum serviço encontrado.</List.Subheader>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: '#1f1f1f',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    paddingLeft: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#e0e0ff',
  },
  description: {
    fontSize: 14,
    color: '#a0a0c0',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#6200ee',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: '#7777aa',
    fontSize: 20,
    fontStyle: 'italic',
  },
});
