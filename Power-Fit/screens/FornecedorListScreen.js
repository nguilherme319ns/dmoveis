import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Divider, Title, Surface, useTheme } from 'react-native-paper';

const fornecedores = [
  { id: '1', nome: 'GrowthSup', contato: '1234-5678' },
  { id: '2', nome: 'GymForce', contato: '9784-7781' },
  { id: '3', nome: 'AcademiaRego', contato: '9999-6133' },
];

export default function SupplierListScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Fornecedores</Title>

      {fornecedores.map((fornecedor, index) => (
        <Surface key={fornecedor.id} style={styles.surface}>
          <List.Item
            title={fornecedor.nome}
            description={`Contato: ${fornecedor.contato}`}
            left={props => <List.Icon {...props} icon="store" color={theme.colors.primary} />}
            style={styles.listItem}
          />
          {index < fornecedores.length - 1 && <Divider />}
        </Surface>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f8fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  surface: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 4, 
    backgroundColor: 'white',
  },
  listItem: {
    borderRadius: 10,
  },
});
