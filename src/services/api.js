import axios from 'axios';
//Api que vamos utilizar para o projeto para recuperar cep:
//https://viacep.com.br/ws/01310930/json/ exemplo dela 100% preenchida, se inser no navegador ira retorna o cep preenchido.

const api = axios.create({
  //criando a url que iremos utilizar e montar a rota no script
  baseURL: 'https://viacep.com.br/ws/',
});

export default api;
