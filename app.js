document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-aluno");
    const tabela = document.getElementById("tabela-alunos").getElementsByTagName('tbody')[0];
    const baseURL = "http://localhost:3000/alunos";
    
    async function carregarAlunos() {
        const response = await fetch(baseURL);
        const alunos = await response.json();
        atualizarTabela(alunos);
    }

    async function adicionarAluno(aluno) {
        await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        carregarAlunos();
    }

    async function deletarAluno(matricula) {
        await fetch(`${baseURL}/${matricula}`, {
            method: 'DELETE'
        });
        carregarAlunos();
    }

    function atualizarTabela(alunos) {
        tabela.innerHTML = "";
        alunos.forEach(aluno => {
            const row = tabela.insertRow();
            row.insertCell().innerText = aluno.nome;
            row.insertCell().innerText = aluno.dataNascimento;
            row.insertCell().innerText = aluno.matricula;
            row.insertCell().innerText = aluno.email;
            row.insertCell().innerText = aluno.telefone;
            row.insertCell().innerText = aluno.endereco;
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Excluir";
            deleteButton.onclick = () => deletarAluno(aluno.matricula);
            deleteCell.appendChild(deleteButton);
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const aluno = {
            nome: document.getElementById("nome").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            matricula: document.getElementById("matricula").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            endereco: document.getElementById("endereco").value
        };
        adicionarAluno(aluno);
        form.reset();
    });

    carregarAlunos();
});