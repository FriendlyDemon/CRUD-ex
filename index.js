const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'catalogo_produtos'
});

connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ' + error.stack);
    return;
  }
  console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});

app.post('/produtos', (req, res) => {
  const { nome, descricao, preco } = req.body;
  const sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)';
  connection.query(sql, [nome, descricao, preco], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao adicionar produto.'+req);
      return;
    }
    res.status(201).send('Produto adicionado com sucesso.');
  });
});

app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM produtos', (error, results) => {
    if (error) {
      res.status(500).send('Erro ao obter produtos.');
      return;
    }
    res.json(results);
  });
});

app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM produtos WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao obter produto.');
      return;
    } else if (results.length==0){
      res.status(404).send('Erro, id inválido');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
  connection.query(sql, [nome, descricao, preco, id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao atualizar produto.');
      return;
    }
    res.status(200).send('Produto atualizado com sucesso.');
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM produtos WHERE id = ?', [id], (error, results) => {
    if (error) {
      res.status(500).send('Erro ao deletar produto.');
      return;
    }
    res.status(200).send('Produto deletado com sucesso.');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 