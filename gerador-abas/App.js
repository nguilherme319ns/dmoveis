import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MegaSenaScreen from './screens/MegaSenaScreen';
import JogoDoBichoScreen from './screens/JogoDoBichoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#f8f8f8' },
        }}
      >
        <Tab.Screen
          name="MegaSena"
          component={MegaSenaScreen}
          options={{
            tabBarLabel: 'Mega Sena',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dice-multiple" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="JogoDoBicho"
          component={JogoDoBichoScreen}
          options={{
            tabBarLabel: 'Jogo do Bicho',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="paw" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});