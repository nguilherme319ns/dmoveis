import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import das telas
import HomeScreen from './screens/HomeScreen';
import HospedeListScreen from './screens/HospedeListScreen';
import HospedeFormScreen from './screens/HospedeFormScreen';
import FuncionarioListScreen from './screens/FuncionarioListScreen';
import FuncionarioFormScreen from './screens/FuncionarioFormScreen';
import DashboardScreen from './screens/DashboardScreen';
import ServicosListScreen from './screens/ServicosListScreen';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Cadastrar Hóspede" component={HospedeFormScreen} />
      <Stack.Screen name="Hóspedes Cadastrados" component={HospedeListScreen} />
      <Stack.Screen name="Cadastrar Funcionario" component={FuncionarioFormScreen} />
      <Stack.Screen name="Funcionarios Cadastrados" component={FuncionarioListScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Serviços" component={ServicosListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Tela Inicial" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="#121212" />
    </PaperProvider>
  );
}
