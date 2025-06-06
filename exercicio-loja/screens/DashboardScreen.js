import React from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Title, Card, Paragraph, Text, useTheme } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const salesData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [10, 25, 15, 40, 60, 30],
      strokeWidth: 2,
      color: () => 'rgba(76, 175, 80, 0.9)', 
    },
  ],
  legend: ['Vendas Mensais'],
};

const profitData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [18, 20, 22, 24, 23, 25],
      color: () => 'rgba(255, 193, 7, 0.9)', 
    },
  ],
};

const inventoryData = {
  labels: ['Suplementos', 'Equipamentos', 'Roupas', 'Acessórios'],
  datasets: [
    {
      data: [40, 30, 20, 10],
    },
  ],
};

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={{ marginBottom: 20, textAlign: 'center' }}>
        Dashboard Loja de Academia
      </Title>

      {/* Cards de resumo */}
      <View style={styles.summaryContainer}>
        <Card style={[styles.summaryCard, { backgroundColor: '#4caf50' }]}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={36}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.summaryNumber}>165</Text>
          <Text style={styles.summaryLabel}>Vendas no último mês</Text>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: '#ffc107' }]}>
          <MaterialCommunityIcons
            name="cash-multiple"
            size={36}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.summaryNumber}>22%</Text>
          <Text style={styles.summaryLabel}>Margem de Lucro</Text>
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: '#03a9f4' }]}>
          <MaterialCommunityIcons
            name="warehouse"
            size={36}
            color="#fff"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.summaryNumber}>1000+</Text>
          <Text style={styles.summaryLabel}>Itens em Estoque</Text>
        </Card>
      </View>

      {/* Gráfico de Vendas */}
      <Card style={styles.chartCard}>
        <Card.Title title="Vendas Mensais" />
        <Card.Content>
          <LineChart
            data={salesData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: theme.colors.background,
              backgroundGradientFrom: '#e0f2f1',
              backgroundGradientTo: '#b2dfdb',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: () => '#004d40',
              style: { borderRadius: 16 },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#2e7d32',
              },
            }}
            style={{ borderRadius: 16 }}
          />
        </Card.Content>
      </Card>

      {/* Gráfico de Margem de Lucro */}
      <Card style={styles.chartCard}>
        <Card.Title title="Margem de Lucro (%)" />
        <Card.Content>
          <BarChart
            data={profitData}
            width={screenWidth - 40}
            height={180}
            fromZero
            chartConfig={{
              backgroundGradientFrom: '#fff8e1',
              backgroundGradientTo: '#fffde7',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
              labelColor: () => '#ff6f00',
              style: { borderRadius: 16 },
            }}
            style={{ borderRadius: 16 }}
          />
        </Card.Content>
      </Card>

      {/* Gráfico de Estoque */}
      <Card style={styles.chartCard}>
        <Card.Title title="Distribuição de Estoque" />
        <Card.Content>
          <BarChart
            data={inventoryData}
            width={screenWidth - 40}
            height={180}
            fromZero
            chartConfig={{
              backgroundGradientFrom: '#e3f2fd',
              backgroundGradientTo: '#bbdefb',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: () => '#0d47a1',
              style: { borderRadius: 16 },
            }}
            style={{ borderRadius: 16 }}
          />
          <Paragraph style={{ marginTop: 10, textAlign: 'center' }}>
            Categorias principais do estoque
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
  },
  chartCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
});
