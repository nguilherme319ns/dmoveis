import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { List, FAB, IconButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlunoListScreen({ navigation }) {
  const [alunos, setAlunos] = useState([]);

  const loadAlunos = async () => {
    try {
      const dados = await AsyncStorage.getItem('alunos');
      const alunos = dados ? JSON.parse(dados) : [];
      setAlunos(alunos);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const novosAlunos = alunos.filter(a => a.id !== id);
              await AsyncStorage.setItem('alunos', JSON.stringify(novosAlunos));
              setAlunos(novosAlunos);
              Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o aluno');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadAlunos);
    return unsubscribe;
  }, [navigation]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum aluno cadastrado.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            description={`Idade: ${item.idade} anos | Peso: ${item.peso} kg | Altura: ${item.altura} cm`}
            onPress={() => navigation.navigate('Cadastrar Aluno', { aluno: item })}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => (
              <IconButton
                {...props}
                icon="delete"
                color="#d32f2f" // vermelho mais bonito e suave
                onPress={() => handleDelete(item.id)}
                accessibilityLabel={`Excluir aluno ${item.nome}`}
              />
            )}
            style={styles.listItem}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
          />
        )}
        contentContainerStyle={alunos.length === 0 && styles.flatListEmpty}
      />

      <FAB
        icon="plus"
        label="Novo Aluno"
        onPress={() => navigation.navigate('Cadastrar Aluno')}
        style={styles.fab}
        small={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
  },
  listItem: {
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: '#555',
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
    fontSize: 18,
    color: '#999',
  },
});
