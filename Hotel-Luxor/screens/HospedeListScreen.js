// HospedeListScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, FAB, IconButton, Divider, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HospedeListScreen({ navigation }) {
  const [hospedes, setHospedes] = useState([]);
  const theme = useTheme();

  const loadHospedes = async () => {
    try {
      const dados = await AsyncStorage.getItem('hospedes');
      const hospedes = dados ? JSON.parse(dados) : [];
      setHospedes(hospedes);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os hóspedes');
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este hóspede?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const novosHospedes = hospedes.filter(h => h.id !== id);
              await AsyncStorage.setItem('hospedes', JSON.stringify(novosHospedes));
              setHospedes(novosHospedes);
              Alert.alert('Sucesso', 'Hóspede excluído com sucesso!');
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o hóspede');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadHospedes);
    return unsubscribe;
  }, [navigation]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum hóspede cadastrado.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={hospedes}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#2c2c2c' }} />}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            description={`Idade: ${item.idade} anos | CPF: ${item.cpf} | Tel: ${item.telefone}`}
            onPress={() => navigation.navigate('Cadastrar Hóspede', { hospede: item })}
            left={props => <List.Icon {...props} icon="account-circle-outline" color={theme.colors.primary} />}
            right={props => (
              <IconButton
                {...props}
                icon="delete-outline"
                color="#ff5252"
                onPress={() => handleDelete(item.id)}
                accessibilityLabel={`Excluir hóspede ${item.nome}`}
              />
            )}
            style={styles.listItem}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
          />
        )}
        contentContainerStyle={hospedes.length === 0 && styles.flatListEmpty}
      />

      <FAB
        icon="plus"
        label="Novo Hóspede"
        onPress={() => navigation.navigate('Cadastrar Hóspede')}
        style={styles.fab}
        small={false}
        extended
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#6200ee',
    elevation: 6,
    borderRadius: 30,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  listItem: {
    backgroundColor: '#1f1f1f',
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#e0e0ff',
  },
  description: {
    fontSize: 14,
    color: '#a0a0c0',
  },
  flatListEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#7777aa',
    fontStyle: 'italic',
  },
});
