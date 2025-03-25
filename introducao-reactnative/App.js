//imports

import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View,   } from 'react-native';
// Função que representa o componente 
export default function App() {

// Logica do componente 
const nome = "GuiGUI"
function alerta(){
  alert("Clicou no TOMA!!!!")
}

// Retorno dessa função com template do que vai ser 
// retorno na tela(JSX)

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>Hello juninho</Text>
      <StatusBar style="auto" />
      <Text>TOMA JACK TOMA JACK</Text>
      <Text>{nome}</Text>
      <Button title='envia Toma' onPress={alert}>TOMA LINDAO</Button>
      <Image
      source={{
        uri:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQvM3fMNPmmrApq5XjvzMiysOAcsmY6nTyO2rdiIEWMYUxg0f6bfa7nVOFahKl8bkGmr_Ik8-4S4KCH1_WF_Rjy9bxVOfmT3RlpC88sEg'
      }}
      style= {{height:300,
        width:300
      }}
      />
      <Image
      source={require('./image/image.png')}
      style= {{height:300,
        width:300
      }}
      />
       <Image
      source={require('./image/image.png')}
      style= {{height:300,
        width:300
      }}
      />
       <Image
      source={require('./image/image.png')}
      style= {{height:300,
        width:300
      }}
      />
    </View>
    </ScrollView>
  );
}
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
