// FuncionarioListScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, FAB, IconButton, Divider, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FuncionarioListScreen({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const theme = useTheme();

  const loadFuncionarios = async () => {
    try {
      const dados = await AsyncStorage.getItem('funcionarios');
      const funcionarios = dados ? JSON.parse(dados) : [];
      setFuncionarios(funcionarios);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os funcionários');
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este funcionário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const novosFuncionarios = funcionarios.filter(f => f.id !== id);
              await AsyncStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));
              setFuncionarios(novosFuncionarios);
              Alert.alert('Sucesso', 'Funcionário excluído com sucesso!');
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o funcionário');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFuncionarios);
    return unsubscribe;
  }, [navigation]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum funcionário cadastrado.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={funcionarios}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#2c2c2c' }} />}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            description={`Cargo: ${item.cargo || 'Não informado'} | Idade: ${item.idade || '-'} anos | Telefone: ${item.telefone || '-'}`}
            onPress={() => navigation.navigate('Cadastrar Funcionário', { funcionario: item })}
            left={props => <List.Icon {...props} icon="account-tie" color={theme.colors.primary} />}
            right={props => (
              <IconButton
                {...props}
                icon="delete-outline"
                color="#ff5252"
                onPress={() => handleDelete(item.id)}
                accessibilityLabel={`Excluir funcionário ${item.nome}`}
              />
            )}
            style={styles.listItem}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
          />
        )}
        contentContainerStyle={funcionarios.length === 0 && styles.flatListEmpty}
      />

      <FAB
        icon="plus"
        label="Novo Funcionário"
        onPress={() => navigation.navigate('Cadastrar Funcionário')}
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
