import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'

import App from './App';
import './index.css';
import { GlobalStyle } from './styles/global';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Alimentação',
          amount: -400,
          type: 'withdraw',
          category: 'Food',
          createAt: new Date()
        },
        {
          id: 2,
          title: 'Desenvolvimento de Website - Google',
          amount: 60000,
          type: 'deposit',
          category: 'Work',
          createAt: new Date()
        },
        {
          id: 3,
          title: 'Aluguel',
          amount: -1100,
          type: 'withdraw',
          category: 'Home',
          createAt: new Date()
        },
        {
          id: 4,
          title: 'Desenvolvimento de Website',
          amount: 12000,
          type: 'deposit',
          category: 'Work',
          createAt: new Date()
        },
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


