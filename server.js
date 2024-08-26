const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/alunos', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler os dados.');
        res.json(JSON.parse(data));
    });
});

app.post('/alunos', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler os dados.');
        const alunos = JSON.parse(data);
        alunos.push(req.body);
        fs.writeFile(DATA_FILE, JSON.stringify(alunos, null, 2), (err) => {
            if (err) return res.status(500).send('Erro ao salvar os dados.');
            res.status(201).send('Aluno cadastrado com sucesso!');
        });
    });
});

app.delete('/alunos/:matricula', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler os dados.');
        let alunos = JSON.parse(data);
        alunos = alunos.filter(aluno => aluno.matricula !== req.params.matricula);
        fs.writeFile(DATA_FILE, JSON.stringify(alunos, null, 2), (err) => {
            if (err) return res.status(500).send('Erro ao salvar os dados.');
            res.send('Aluno excluído com sucesso!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});