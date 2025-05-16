import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const MegaSenaScreen = () => {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  const gerarJogo = () => {
    const numeros = [];
    while (numeros.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(numero)) {
        numeros.push(numero);
      }
    }
    const jogoOrdenado = numeros.sort((a, b) => a - b);
    setJogoGerado(jogoOrdenado);
    setJogosMegaSena([...jogosMegaSena, jogoOrdenado]);
  };

  return (
    <View style={styles.container}>
      <Button title="Gerar Jogo da Mega Sena" onPress={gerarJogo} color="#6200ee" />
      
      {jogoGerado.length > 0 && (
        <Card style={styles.card}>
          <Card.Title title="Jogo Gerado" />
          <Card.Content>
            <Text style={styles.jogoText}>
              {jogoGerado.join(' - ')}
            </Text>
          </Card.Content>
        </Card>
      )}

      {jogosMegaSena.length > 0 && (
        <Card style={styles.card}>
          <Card.Title title="Histórico de Jogos" />
          <Card.Content>
            <FlatList
              data={jogosMegaSena}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.historicoItem}>{item.join(' - ')}</Text>
              )}
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 16,
    marginBottom: 16,
  },
  jogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6200ee',
  },
  historicoItem: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default MegaSenaScreen;