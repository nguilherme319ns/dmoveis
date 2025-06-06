import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, HelperText, Title, useTheme } from 'react-native-paper';
import MaskInput from 'react-native-mask-input';

export default function AlunoFormScreen({ navigation, route }) {
  const theme = useTheme();
  const alunoParam = route.params?.aluno;

  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    if (alunoParam) {
      setId(alunoParam.id);
      setNome(alunoParam.nome);
      setIdade(alunoParam.idade);
      setPeso(alunoParam.peso);
      setAltura(alunoParam.altura);
      setDataNascimento(alunoParam.dataNascimento);
    }
  }, [alunoParam]);

  const hasErrors = () => nome.trim() === '' || idade.trim() === '' || peso.trim() === '' || altura.trim() === '';

  const handleSave = async () => {
    if (hasErrors()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const novoAluno = {
      id: id ?? Date.now(),
      nome,
      idade,
      peso,
      altura,
      dataNascimento,
    };

    try {
      const dados = await AsyncStorage.getItem('alunos');
      let alunos = dados ? JSON.parse(dados) : [];

      if (id) {
        alunos = alunos.map(a => (a.id === id ? novoAluno : a));
      } else {
        alunos.push(novoAluno);
      }

      await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
      Alert.alert('Sucesso', `Aluno ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
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
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</Title>

        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#bbb"
          error={nome.trim() === ''}
          autoCapitalize="words"
        />
        <HelperText type="error" visible={nome.trim() === ''}>
          Nome é obrigatório
        </HelperText>

        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#bbb"
          error={idade.trim() === ''}
        />
        <HelperText type="error" visible={idade.trim() === ''}>
          Idade é obrigatória
        </HelperText>

        <TextInput
          label="Peso (kg)"
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#bbb"
          error={peso.trim() === ''}
        />
        <HelperText type="error" visible={peso.trim() === ''}>
          Peso é obrigatório
        </HelperText>

        <TextInput
          label="Altura (cm)"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.colors.primary}
          outlineColor="#bbb"
          error={altura.trim() === ''}
        />
        <HelperText type="error" visible={altura.trim() === ''}>
          Altura é obrigatória
        </HelperText>

        <View style={styles.maskedInputContainer}>
          <HelperText type="info" visible={true} style={styles.helperInfo}>
            Data de Nascimento (DD/MM/AAAA)
          </HelperText>
          <MaskInput
            value={dataNascimento}
            onChangeText={setDataNascimento}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            style={[styles.maskedInput, { borderColor: theme.colors.primary }]}
            keyboardType="numeric"
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#999"
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          buttonColor={theme.colors.primary}
          disabled={hasErrors()}
        >
          {id ? 'Atualizar' : 'Salvar'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f7f9fc',
  },
  title: {
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontSize: 24,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  maskedInputContainer: {
    marginBottom: 20,
  },
  maskedInput: {
    backgroundColor: 'white',
    height: 56,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  helperInfo: {
    marginBottom: 6,
    fontWeight: '600',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
});
