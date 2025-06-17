// HospedeFormScreen.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, HelperText, Title, useTheme } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

export default function HospedeFormScreen({ navigation, route }) {
  const theme = useTheme();
  const hospedeParam = route.params?.hospede;

  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    if (hospedeParam) {
      setId(hospedeParam.id);
      setNome(hospedeParam.nome);
      setIdade(hospedeParam.idade);
      setCpf(hospedeParam.cpf);
      setTelefone(hospedeParam.telefone);
      setDataNascimento(hospedeParam.dataNascimento);
    }
  }, [hospedeParam]);

  const hasErrors = () =>
    nome.trim() === '' || idade.trim() === '' || cpf.trim() === '' || telefone.trim() === '';

  const handleSave = async () => {
    if (hasErrors()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const novoHospede = {
      id: id ?? Date.now(),
      nome,
      idade,
      cpf,
      telefone,
      dataNascimento,
    };

    try {
      const dados = await AsyncStorage.getItem('hospedes');
      let hospedes = dados ? JSON.parse(dados) : [];

      if (id) {
        hospedes = hospedes.map(h => (h.id === id ? novoHospede : h));
      } else {
        hospedes.push(novoHospede);
      }

      await AsyncStorage.setItem('hospedes', JSON.stringify(hospedes));
      Alert.alert('Sucesso', `Hóspede ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Title style={styles.title}>{id ? 'Editar Hóspede' : 'Cadastro de Hóspede'}</Title>

        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#00ffcc"
          outlineColor="#333"
          error={nome.trim() === ''}
          autoCapitalize="words"
          theme={{ colors: { text: '#00ffe1', placeholder: '#00ffccee', background: '#121521' } }}
        />
        <HelperText type="error" visible={nome.trim() === ''} style={styles.helperText}>
          Nome é obrigatório
        </HelperText>

        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#00ffcc"
          outlineColor="#333"
          error={idade.trim() === ''}
          theme={{ colors: { text: '#00ffe1', placeholder: '#00ffccee', background: '#121521' } }}
        />
        <HelperText type="error" visible={idade.trim() === ''} style={styles.helperText}>
          Idade é obrigatória
        </HelperText>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={styles.helperInfo}>
            CPF
          </HelperText>
          <MaskInput
            value={cpf}
            onChangeText={setCpf}
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            style={[styles.maskedInput, { borderColor: '#00ffcc', color: '#00ffe1', backgroundColor: '#121521' }]}
            keyboardType="numeric"
            placeholder="000.000.000-00"
            placeholderTextColor="#00ffccee"
          />
          {cpf.trim() === '' && (
            <HelperText type="error" visible style={styles.helperText}>
              CPF é obrigatório
            </HelperText>
          )}
        </View>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={styles.helperInfo}>
            Telefone (com DDD)
          </HelperText>
          <MaskInput
            value={telefone}
            onChangeText={setTelefone}
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            style={[styles.maskedInput, { borderColor: '#00ffcc', color: '#00ffe1', backgroundColor: '#121521' }]}
            keyboardType="numeric"
            placeholder="(00) 0000-0000"
            placeholderTextColor="#00ffccee"
          />
          {telefone.trim() === '' && (
            <HelperText type="error" visible style={styles.helperText}>
              Telefone é obrigatório
            </HelperText>
          )}
        </View>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible style={styles.helperInfo}>
            Data de Nascimento (DD/MM/AAAA)
          </HelperText>
          <MaskInput
            value={dataNascimento}
            onChangeText={setDataNascimento}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            style={[styles.maskedInput, { borderColor: '#00ffcc', color: '#00ffe1', backgroundColor: '#121521' }]}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#00ffccee"
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          contentStyle={{ paddingVertical: 12 }}
          buttonColor="#00ffcc"
          disabled={hasErrors()}
          labelStyle={{ color: '#121521', fontWeight: 'bold', fontSize: 16 }}
        >
          {id ? 'Atualizar' : 'Salvar'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: '#0d1117',
    flexGrow: 1,
  },
  title: {
    marginBottom: 30,
    fontWeight: '900',
    textAlign: 'center',
    color: '#00ffcc',
    fontSize: 28,
    letterSpacing: 1.2,
    textShadowColor: '#00ffcca0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#121521',
    borderRadius: 10,
  },
  maskedInputContainer: {
    marginBottom: 26,
  },
  maskedInput: {
    height: 56,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '600',
    shadowColor: '#00ffcc',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  helperInfo: {
    marginBottom: 8,
    fontWeight: '700',
    color: '#00ffcc',
  },
  helperText: {
    color: '#ff3860',
    fontWeight: '700',
  },
  button: {
    marginTop: 12,
    borderRadius: 14,
    elevation: 6,
    shadowColor: '#00ffcc',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
});
