import React from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Title, Button, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const backgroundImage = {
  uri: 'https://media.istockphoto.com/id/1322158059/pt/foto/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.jpg?s=612x612&w=0&k=20&c=eFfg0ECbiSopufODZ0Kz6yKTXvay0pXQpwJaUXxpBoc=',
};

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} blurRadius={3}>
      <StatusBar style="light" />
      
      <View style={{ height: insets.top, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      
      <View style={styles.overlay}>
        <Title style={[styles.title, { color: '#fff' }]}>Bem-vindo ao PowerFit!</Title>
        <Text style={styles.subtitle}>Seu app para acompanhar treinos, alunos e produtos</Text>

        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Cadastrar Aluno')}
            style={[styles.button, { backgroundColor: theme.colors.accent  }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Cadastrar Aluno
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Alunos Cadastrados')}
            style={[styles.button, { backgroundColor: theme.colors.accent }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Alunos Cadastrados
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Fornecedores')}
            style={[styles.button, { backgroundColor: theme.colors.accent  }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Fornecedores
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Dashboard')}
            style={[styles.button, { backgroundColor: theme.colors.accent  }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Dashboard
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Produtos')}
            style={[styles.button, { backgroundColor: theme.colors.accent  }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Produtos
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('TreinoGPS')}
            style={[styles.button, { backgroundColor: theme.colors.accent  }]}
            contentStyle={styles.buttonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Treino com GPS
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
 title: {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 6,
  textAlign: 'center',
  textShadowColor: 'rgba(0, 0, 0, 0.8)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
},
  subtitle: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 14,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 14,
  },
});
