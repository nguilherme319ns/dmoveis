import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import AlunoListScreen from './screens/AlunoListScreen';
import AlunoFormScreen from './screens/AlunoFormScreen';
import FornecedorListScreen from './screens/FornecedorListScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProdutosListScreen from './screens/ProdutosListScreen';
import TreinoGpsScreen from './screens/TreinoGpsScreen';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Cadastrar Aluno" component={AlunoFormScreen} />
      <Stack.Screen name="Alunos Cadastrados" component={AlunoListScreen} />
      <Stack.Screen name="Fornecedores" component={FornecedorListScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Produtos" component={ProdutosListScreen} />
      <Stack.Screen name="TreinoGPS" component={TreinoGpsScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Tela de inicio" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" backgroundColor="#121212" />
    </PaperProvider>
  );
}
