import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { List, ActivityIndicator, Divider } from 'react-native-paper';

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const gymKeywords = [
    'fitness', 'gym', 'protein', 'supplement', 'sports',
    'workout', 'muscle', 'training', 'weight', 'yoga',
    'athletic', 'run', 'cardio', 'exercise'
  ];

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const json = await res.json();
      const filtered = json.products.filter(product => {
        const text = (product.title + ' ' + product.category).toLowerCase();
        return gymKeywords.some(keyword => text.includes(keyword));
      });
      setProducts(filtered);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Divider}
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
        contentContainerStyle={products.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <List.Subheader>Nenhum produto encontrado.</List.Subheader>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16,
    alignSelf: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
});
