import React from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Title, Card, Paragraph, Text } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const reservasData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [15, 30, 25, 45, 50, 35],
      strokeWidth: 3,
      color: () => '#00ffe7', // neon cyan
    },
  ],
  legend: ['Reservas Mensais'],
};

const ocupacaoData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [60, 75, 80, 70, 85, 90],
      color: () => '#ff6d00', // neon orange
    },
  ],
};

const distribuicaoData = {
  labels: ['Standard', 'Luxo', 'Premium', 'Suíte Master'],
  datasets: [
    {
      data: [40, 30, 20, 10],
      color: () => '#9d00ff', // neon purple
    },
  ],
};

export default function DashboardScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Title style={styles.title}>Dashboard do Hotel</Title>

      {/* Cards resumo */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, styles.neonCard]}>
          <View style={[styles.iconCircle, { backgroundColor: '#00ffe7' }]}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={36}
              color="#000"
              style={styles.iconGlow}
            />
          </View>
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Hóspedes Ativos</Text>
        </View>

        <View style={[styles.summaryCard, styles.neonCard]}>
          <View style={[styles.iconCircle, { backgroundColor: '#ff6d00' }]}>
            <MaterialCommunityIcons
              name="bed"
              size={36}
              color="#000"
              style={styles.iconGlow}
            />
          </View>
          <Text style={styles.summaryNumber}>85%</Text>
          <Text style={styles.summaryLabel}>Taxa de Ocupação</Text>
        </View>

        <View style={[styles.summaryCard, styles.neonCard]}>
          <View style={[styles.iconCircle, { backgroundColor: '#9d00ff' }]}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={36}
              color="#000"
              style={styles.iconGlow}
            />
          </View>
          <Text style={styles.summaryNumber}>50</Text>
          <Text style={styles.summaryLabel}>Reservas Ativas</Text>
        </View>
      </View>

      {/* Gráfico de Reservas */}
      <Card style={[styles.chartCard, styles.neonCardBackground]}>
        <Card.Title
          title="Reservas Mensais"
          titleStyle={styles.chartTitle}
          left={() => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={28}
              color="#00ffe7"
              style={styles.iconGlow}
            />
          )}
        />
        <Card.Content>
          <LineChart
            data={reservasData}
            width={screenWidth - 40}
            height={220}
            withShadow={false}
            withDots
            withInnerLines
            withOuterLines
            chartConfig={{
              backgroundGradientFrom: '#000814',
              backgroundGradientTo: '#001d3d',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 255, 231, ${opacity})`,
              labelColor: () => '#00ffe7',
              propsForDots: {
                r: '6',
                strokeWidth: '3',
                stroke: '#00ffe7',
                fill: '#001d3d',
              },
            }}
            style={styles.chartStyle}
          />
        </Card.Content>
      </Card>

      {/* Gráfico de Ocupação */}
      <Card style={[styles.chartCard, styles.neonCardBackground]}>
        <Card.Title
          title="Taxa de Ocupação (%)"
          titleStyle={styles.chartTitle}
          left={() => (
            <MaterialCommunityIcons
              name="bed-empty"
              size={28}
              color="#ff6d00"
              style={styles.iconGlow}
            />
          )}
        />
        <Card.Content>
          <BarChart
            data={ocupacaoData}
            width={screenWidth - 40}
            height={180}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundGradientFrom: '#000814',
              backgroundGradientTo: '#001d3d',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 109, 0, ${opacity})`,
              labelColor: () => '#ff6d00',
              fillShadowGradient: '#ff6d00',
              fillShadowGradientOpacity: 1,
            }}
            style={styles.chartStyle}
          />
        </Card.Content>
      </Card>

      {/* Distribuição dos Tipos de Quarto */}
      <Card style={[styles.chartCard, styles.neonCardBackground]}>
        <Card.Title
          title="Distribuição de Quartos"
          titleStyle={styles.chartTitle}
          left={() => (
            <MaterialCommunityIcons
              name="bed-double"
              size={28}
              color="#9d00ff"
              style={styles.iconGlow}
            />
          )}
        />
        <Card.Content>
          <BarChart
            data={distribuicaoData}
            width={screenWidth - 40}
            height={180}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundGradientFrom: '#000814',
              backgroundGradientTo: '#001d3d',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(157, 0, 255, ${opacity})`,
              labelColor: () => '#9d00ff',
              fillShadowGradient: '#9d00ff',
              fillShadowGradientOpacity: 1,
            }}
            style={styles.chartStyle}
          />
          <Paragraph style={styles.chartDescription}>
            Tipos de quartos disponíveis no hotel
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000814', // dark navy background
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00ffe7',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 28,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010c1a',
  },
  neonCard: {
    borderWidth: 1.5,
    borderColor: '#00ffe7',
    shadowColor: '#00ffe7',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  iconCircle: {
    padding: 14,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#00ffe7',
    shadowColor: '#00ffe7',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
  },
  iconGlow: {
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  summaryNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00ffe7',
    marginBottom: 6,
    letterSpacing: 1.5,
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00ffe7',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  chartCard: {
    marginBottom: 32,
    borderRadius: 24,
    backgroundColor: '#010c1a',
  },
  neonCardBackground: {
    borderWidth: 1,
    borderColor: '#00ffe7',
    shadowColor: '#00ffe7',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  chartTitle: {
    fontWeight: '900',
    fontSize: 22,
    color: '#00ffe7',
    letterSpacing: 1.5,
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  chartStyle: {
    borderRadius: 24,
  },
  chartDescription: {
    marginTop: 14,
    fontSize: 14,
    color: '#00ffe7',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: '#00ffe7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
