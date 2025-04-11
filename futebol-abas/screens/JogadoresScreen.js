import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const jogadores = [
  {
    nome: "Lucas Moura",
    numero: 7,
    imagem: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ8tv8hi5NKk_oj10pUADC5oGo_nq31XWv2Ir3PMwP9m3ZEr3M3uJD1chw32KP5oXmoE3Kd6-IQqrHgywE"
  },
  {
    nome: "Calleri",
    numero: 9,
    imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/06/GettyImages-1497032501-e1686268569381.jpg?w=1200&h=1200&crop=1"
  },
  {
    nome: "Luciano",
    numero: 10,
    imagem: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRguFe8FHasHhMGRfhG6mH2wY7IGMmxiPf4x_b27tcIQl0W889hEBeNohVNJEisyDSxQvYP6Fevf2VMwG8Oc2aqlQ"
  },
  {
    nome: "Kaká",
    numero: 8,
    imagem: "https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2017/10/15/59e2d914397c8.jpeg"
  },
  {
    nome: "Arboleda",
    numero: 5,
    imagem: "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0809%2Fr1208394_2_1296x729_16%2D9.jpg"
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
