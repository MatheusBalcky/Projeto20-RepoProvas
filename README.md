# <p align = "center"> Projeto RepoProvas </p>


## :clipboard: Descrição 

"RepoProvas" um sistema de compartilhamento de provas entre estudantes!
No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros.

##	:computer: Tecnologias e Conceitos

- REST APIs
- JWT
- Node.js
- TypeScript
- Prisma
- Postgres
- Jest (QA)

***

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "repeatPassword": "loremipsum"
      }
```
    
```yml 
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
      "email": "lorem@gmail.com",
      "password": "loremipsum"
    }
```
    
```yml 
POST /new-test (autenticada)
    - Rota para criar um novo repo de prova no sistema
    - headers: { "Authorization": "Bearer <token>" }
    - body: {
      "name": "Projeto DrivenFood",
      "categoryId": 1 (1-3),
      "pdfUrl": "https://www.praticaPdf.com",
      "teacherDisciplineId": 5 (1-6),
    }
```

```yml
GET /testsbydiscipline (autenticada)
    - Rota para consultar provas por disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /testsbyinstructor (autenticada)
    - Rota para consultar provas por professor
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

***

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o Node.Js e com o gerenciador de bibliotecas NPM, então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/MatheusBalcky/Projeto20-RepoProvas.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Logo após faça as migrates do prisma para criar o banco da aplicação local (postgres).

```
npx migrate dev
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```
