// FuncionarioFormScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, HelperText, Title, useTheme } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

export default function FuncionarioFormScreen({ navigation, route }) {
  const theme = useTheme();
  const funcionarioParam = route.params?.funcionario;

  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    if (funcionarioParam) {
      setId(funcionarioParam.id);
      setNome(funcionarioParam.nome);
      setIdade(funcionarioParam.idade?.toString() || '');
      setCpf(funcionarioParam.cpf);
      setTelefone(funcionarioParam.telefone);
      setDataNascimento(funcionarioParam.dataNascimento);
    }
  }, [funcionarioParam]);

  const hasErrors = () =>
    nome.trim() === '' ||
    idade.trim() === '' ||
    cpf.trim().length !== 14 || // CPF format: 000.000.000-00
    telefone.trim().length !== 14; // Telefone format: (00) 0000-0000

  const handleSave = async () => {
    if (hasErrors()) {
      Alert.alert('Erro', 'Por favor, preencha corretamente todos os campos obrigatórios.');
      return;
    }

    const novoFuncionario = {
      id: id ?? Date.now(),
      nome,
      idade,
      cpf,
      telefone,
      dataNascimento,
    };

    try {
      const dados = await AsyncStorage.getItem('funcionarios');
      let funcionarios = dados ? JSON.parse(dados) : [];

      if (id) {
        funcionarios = funcionarios.map(f => (f.id === id ? novoFuncionario : f));
      } else {
        funcionarios.push(novoFuncionario);
      }

      await AsyncStorage.setItem('funcionarios', JSON.stringify(funcionarios));
      Alert.alert('Sucesso', `Funcionário ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          {id ? 'Editar Funcionário' : 'Cadastro de Funcionário'}
        </Title>

        <TextInput
          label="Nome *"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#444"
          error={nome.trim() === ''}
          autoCapitalize="words"
          placeholder="Digite o nome completo"
          theme={{
            colors: {
              text: '#fff',           
              placeholder: '#8bded9',
              background: '#121521',
            },
          }}
        />
        <HelperText type="error" visible={nome.trim() === ''}>
          Nome é obrigatório
        </HelperText>

        <TextInput
          label="Idade *"
          value={idade}
          onChangeText={text => setIdade(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#444"
          error={idade.trim() === ''}
          placeholder="Ex: 30"
          theme={{
            colors: {
              text: '#fff',           
              placeholder: '#8bded9',
              background: '#121521',
            },
          }}
          maxLength={3}
        />
        <HelperText type="error" visible={idade.trim() === ''}>
          Idade é obrigatória
        </HelperText>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={[styles.helperInfo, { color: theme.colors.primary }]}>
            CPF *
          </HelperText>
          <MaskInput
            value={cpf}
            onChangeText={setCpf}
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            style={[
              styles.maskedInput,
              {
                borderColor: cpf.trim().length === 14 ? '#00ffcc' : '#ff3860',
                color: '#fff',             
                backgroundColor: '#121521',
              },
            ]}
            keyboardType="numeric"
            placeholder="000.000.000-00"
            placeholderTextColor="#00ffccee"
            maxLength={14}
          />
          {cpf.trim().length !== 14 && (
            <HelperText type="error" visible>
              CPF inválido ou vazio
            </HelperText>
          )}
        </View>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={[styles.helperInfo, { color: theme.colors.primary }]}>
            Telefone (com DDD) *
          </HelperText>
          <MaskInput
            value={telefone}
            onChangeText={setTelefone}
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            style={[
              styles.maskedInput,
              {
                borderColor: telefone.trim().length === 14 ? '#00ffcc' : '#ff3860',
                color: '#fff',              
                backgroundColor: '#121521',
              },
            ]}
            keyboardType="numeric"
            placeholder="(00) 0000-0000"
            placeholderTextColor="#00ffccee"
            maxLength={14}
          />
          {telefone.trim().length !== 14 && (
            <HelperText type="error" visible>
              Telefone inválido ou vazio
            </HelperText>
          )}
        </View>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={[styles.helperInfo, { color: theme.colors.primary }]}>
            Data de Nascimento (DD/MM/AAAA)
          </HelperText>
          <MaskInput
            value={dataNascimento}
            onChangeText={setDataNascimento}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            style={[
              styles.maskedInput,
              {
                borderColor: '#00ffcc',
                color: '#fff',              
                backgroundColor: '#121521',
              },
            ]}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#00ffccee"
            maxLength={10}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          contentStyle={{ paddingVertical: 14 }}
          buttonColor={theme.colors.primary}
          disabled={hasErrors()}
          labelStyle={{ color: theme.colors.background, fontWeight: 'bold', fontSize: 16 }}
          uppercase={false}
          rippleColor="#00ffe1"
        >
          {id ? 'Atualizar' : 'Salvar'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 48,
    flexGrow: 1,
    backgroundColor: '#0d1117',
  },
  title: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 28,
    letterSpacing: 1.2,
    textShadowColor: '#00ffccaa',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 30,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#121521',
    borderRadius: 12,
  },
  maskedInputContainer: {
    marginBottom: 28,
  },
  maskedInput: {
    height: 54,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '600',
    shadowColor: '#00ffcc',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  helperInfo: {
    marginBottom: 8,
    fontWeight: '700',
  },
  button: {
    marginTop: 8,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#00ffcc',
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
  },
});
