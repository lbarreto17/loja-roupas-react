# STYLE 👕

O **STYLE** é uma aplicação web de loja de roupas desenvolvida em React com integração ao Firebase.

O projeto foi desenvolvido para a disciplina de **Desenvolvimento Híbrido** e tem como objetivo aplicar conceitos de autenticação, persistência de dados, operações CRUD e gerenciamento de informações privadas por usuário.

---

## 📋 Funcionalidades

- Cadastro de usuários
- Login e logout
- Autenticação com Firebase Authentication
- Catálogo de produtos
- Filtro de produtos por categoria
- Seleção de tamanho
- Adição de produtos ao carrinho
- Carrinho individual para cada usuário
- Alteração da quantidade dos produtos
- Remoção de produtos
- Cálculo automático de subtotal e valor total
- Persistência dos dados utilizando Cloud Firestore
- Interface responsiva

---

## 🔐 Autenticação e privacidade

O sistema utiliza o **Firebase Authentication** para realizar o cadastro e login dos usuários.

Cada usuário autenticado possui seu próprio carrinho. Os dados são armazenados no Firestore vinculados ao UID da conta:

```text
usuarios/{uid}/carrinho/{item}
```

Dessa forma, os dados do carrinho ficam separados por usuário.

Durante os testes, foram utilizadas contas diferentes para verificar o isolamento dos dados entre usuários.

---

## 🛒 CRUD do carrinho

O gerenciamento do carrinho implementa as quatro operações básicas de CRUD:

- **Create:** adicionar um produto ao carrinho
- **Read:** carregar os produtos salvos no carrinho
- **Update:** alterar a quantidade de um produto
- **Delete:** remover um produto do carrinho

As alterações são persistidas utilizando o **Cloud Firestore**.

---

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- HTML
- CSS
- Vite
- Firebase Authentication
- Cloud Firestore
- Git
- GitHub
- Visual Studio Code

---

## 📁 Estrutura principal do projeto

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   └── produtos.js
├── pages/
│   ├── Cadastro.jsx
│   ├── Carrinho.jsx
│   ├── Home.jsx
│   └── Login.jsx
├── services/
│   └── carrinhoService.js
├── App.jsx
├── firebase.js
├── index.css
└── main.jsx
```

As imagens utilizadas no catálogo estão armazenadas em:

```text
public/produtos/
```

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/lbarreto17/loja-roupas-react.git
```

### 2. Entre na pasta do projeto

```bash
cd loja-roupas-react
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

Depois, abra no navegador o endereço local informado pelo Vite.

---

## 🔥 Firebase

O Firebase é utilizado em duas partes principais do projeto.

### Firebase Authentication

Responsável por:

- Cadastro de usuários
- Login
- Logout
- Controle da sessão do usuário

### Cloud Firestore

Responsável por:

- Armazenar os itens do carrinho
- Consultar os produtos adicionados
- Atualizar quantidades
- Remover produtos
- Separar os dados de acordo com o usuário autenticado

---

## 🛍️ Catálogo

O sistema possui um catálogo de roupas dividido em categorias:

- Camisetas
- Moletons
- Calças
- Bermudas
- Jaquetas

O usuário pode selecionar uma categoria para visualizar somente os produtos correspondentes ou utilizar a opção **Todos** para visualizar o catálogo completo.

Cada produto apresenta informações como:

- Nome
- Categoria
- Preço
- Tamanhos disponíveis
- Imagem
- Opção para adicionar ao carrinho

---

## 👥 Organização do desenvolvimento

O projeto foi desenvolvido em equipe utilizando **Git e GitHub**.

O desenvolvimento foi dividido em etapas:

1. Estrutura inicial e catálogo de produtos
2. Implementação da autenticação com Firebase
3. Integração do carrinho com Firestore e operações CRUD
4. Melhorias visuais e experiência do usuário
5. Integração, testes e ajustes finais

Foram utilizadas **branches, commits e Pull Requests** para organizar e integrar as funcionalidades à branch principal do projeto.

---

## 👨‍💻 Integrantes

- **Lucas José Monteiro Sales Barreto**
- **Caio Gama da Silva Campos**
- **Diego Araujo Xavier**
- **Matheus Teixeira Aguiar**

---

## 🎓 Projeto acadêmico

Projeto desenvolvido para fins acadêmicos na disciplina de **Desenvolvimento Híbrido**.

O objetivo foi aplicar na prática conceitos de desenvolvimento web, React, autenticação, banco de dados, persistência de informações, CRUD e desenvolvimento colaborativo utilizando Git e GitHub.