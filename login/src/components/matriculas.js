import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Matricula.css';
import InputMask from 'react-input-mask';

// Dentro do componente Matricula
const validarCPF = (cpf) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return cpfRegex.test(cpf);
};

const validarTelefone = (telefone) => {
  const telefoneRegex = /^\(\d{2}\) \d{4,5}\-\d{4}$/;
  return telefoneRegex.test(telefone);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validarCPF(dadosAluno.cpf)) {
    setErro('Formato de CPF inválido. Use: 000.000.000-00');
    return;
  }
  
  if (!validarTelefone(dadosAluno.telefone)) {
    setErro('Formato de telefone inválido. Use: (00) 00000-0000');
    return;
  }
  



const Matricula = () => {
  const [dadosAluno, setDadosAluno] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    curso: '',
    telefone: ''
  });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosAluno(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/matricula', dadosAluno);
      alert('Matrícula realizada com sucesso!');
      navigate('/login'); // Redireciona para login após matrícula
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Erro na matrícula');
    }
  };

  return (
    <div className="container-matricula">
      <h2>Formulário de Matrícula</h2>
      {erro && <div className="mensagem-erro">{erro}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="grupo-form">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={dadosAluno.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grupo-form">
          <label>Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            value={dadosAluno.sobrenome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grupo-form">
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            name="cpf"
            value={dadosAluno.cpf}
            onChange={handleChange}
            required
            className="campo-formulario"  // Sua classe CSS
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>

        <div className="grupo-form">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={dadosAluno.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grupo-form">
          <label>Curso:</label>
          <select
            name="curso"
            value={dadosAluno.curso}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um curso</option>
            <option value="Engenharia de Software">Engenharia de Software</option>
            <option value="Medicina">Medicina</option>
            <option value="Direito">Direito</option>
            <option value="Administração">Administração</option>
          </select>
        </div>

        <div className="grupo-form">
          <label>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="telefone"
            value={dadosAluno.telefone}
            onChange={handleChange}
            required
            className="campo-formulario"  // Sua classe CSS
          >
            {(inputProps) => <input {...inputProps} type="tel" />}
          </InputMask>
        </div>

        <button type="submit" className="botao-enviar">Realizar Matrícula</button>
      </form>
    </div>
  );
};
};


export default Matricula;