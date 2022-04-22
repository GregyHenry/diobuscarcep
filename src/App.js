import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './index.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  //criando um objeto vazio para utilizar para gravação dos dados retornados da api
  const [cep, setCep] = useState({});

  //Definindo uma função assincrona, pois api pode ter um delay de resposta
  async function apiChamada() {
    //Verifica se foi digitado algo para pesquisar
    if (input === '') {
      alert('Preencha algum cep!');
      return;
    }
    //Realiza a chamada da api para consultar o cep
    try {
      //await para esperar a requisição retorna
      const response = await api.get(`${input}/json`);
      //Armazena os dados retornados da api sobre o cep
      setCep(response.data);
      //Limpa o campo na tela
      setInput('');
    } catch {
      alert('Ops erro ao buscar o cep informado!');
      //Retorna o preenchimento para vazio o campo em caso de erro apos o alerta
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(evento) => setInput(evento.target.value)}
        ></input>
        <button className="buttonSearch" onClick={apiChamada}>
          <FiSearch className="FiS" size={25}></FiSearch>
        </button>
      </div>

      {
        //Rederizando com codigo(object.keys) o template do cep apenas se tiver retorno na primeira consulta se não, não será exibido
        Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>Cep: {cep.cep}</h2>
            <span>Logradouro: {cep.logradouro} </span>
            <span>Complemento: {cep.complemento} </span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade} - {cep.uf}{' '}
            </span>
          </main>
        )
      }
    </div>
  );
}

export default App;
