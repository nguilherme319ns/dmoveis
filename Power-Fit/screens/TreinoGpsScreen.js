import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Title, Text, Button, Card, IconButton, useTheme } from 'react-native-paper';

export default function TreinoGpsScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const theme = useTheme();

  const askPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão para acessar localização negada!');
      Alert.alert('Erro', 'Permissão para acessar localização negada!');
      return false;
    }
    return true;
  };

  const startTracking = async () => {
    const hasPermission = await askPermission();
    if (!hasPermission) return;

    setTracking(true);

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (loc) => {
        setLocation(loc.coords);
      }
    );

    setSubscription(sub);
  };

  const stopTracking = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setTracking(false);
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Treino com GPS</Title>

      <Card style={styles.card} elevation={5}>
        <Card.Content>
          {location ? (
            <>
              <View style={styles.row}>
                <IconButton icon="crosshairs-gps" size={28} color={theme.colors.primary} />
                <Text style={styles.label}>Latitude:</Text>
                <Text style={styles.value}>{location.latitude.toFixed(6)}</Text>
              </View>

              <View style={styles.row}>
                <IconButton icon="crosshairs-gps" size={28} color={theme.colors.primary} />
                <Text style={styles.label}>Longitude:</Text>
                <Text style={styles.value}>{location.longitude.toFixed(6)}</Text>
              </View>

              <View style={styles.row}>
                <IconButton icon="speedometer" size={28} color={theme.colors.primary} />
                <Text style={styles.label}>Velocidade:</Text>
                <Text style={styles.value}>
                  {location.speed ? (location.speed * 3.6).toFixed(2) : '0'} km/h
                </Text>
              </View>

              <View style={styles.row}>
                <IconButton icon="ruler" size={28} color={theme.colors.primary} />
                <Text style={styles.label}>Precisão:</Text>
                <Text style={styles.value}>{location.accuracy.toFixed(2)} metros</Text>
              </View>
            </>
          ) : (
            <Text style={styles.noLocation}>Nenhuma localização disponível.</Text>
          )}
        </Card.Content>
      </Card>

      <Button
        mode={tracking ? 'contained-tonal' : 'contained'}
        icon={tracking ? 'stop-circle' : 'play-circle'}
        onPress={tracking ? stopTracking : startTracking}
        style={[styles.button, { backgroundColor: tracking ? '#d32f2f' : '#388e3c' }]}
        contentStyle={{ flexDirection: 'row-reverse' }}
        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
      >
        {tracking ? 'Parar Treino' : 'Iniciar Treino'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00e676',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  card: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    color: '#bbb',
    fontSize: 16,
    width: 90,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noLocation: {
    color: '#bbb',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 12,
  },
});
