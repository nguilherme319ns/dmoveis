import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const jogadores = [
  {
    nome: "Lucas Moura",
    numero: 7,
    imagem: "https://s2-ge.glbimg.com/3m-1CWEEfQo2zYo9TfNd-EoN2oo=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_7f5a5957dbaa4d0e8b902ded3d14f5a6/internal_photos/bs/2023/N/2/YKUhn9QpGnhntf3OdtIg/lucas.jpg"
  },
  {
    nome: "Calleri",
    numero: 9,
    imagem: "https://conteudo.imguol.com.br/c/esporte/0f/2023/09/17/jonathan-calleri-do-sao-paulo-em-partida-contra-o-coritiba-1694989812775_v2_450x450.jpg"
  },
  {
    nome: "Luciano",
    numero: 10,
    imagem: "https://i.pinimg.com/474x/b5/6b/c3/b56bc36508d7d7fca13c35dbe352a949.jpg"
  },
  {
    nome: "Rafinha",
    numero: 13,
    imagem: "https://www.saopaulofc.net/media/24193/rafinha.png"
  },
  {
    nome: "Arboleda",
    numero: 5,
    imagem: "https://www.saopaulofc.net/media/24184/arboleda.png"
  },
];

const JogadoresScreen = () => {
  return (
    <FlatList
      data={jogadores}
      keyExtractor={(item) => item.numero.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>Número: {item.numero}</Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JogadoresScreen;
