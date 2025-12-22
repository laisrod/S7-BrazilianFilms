# 🎬 Cinema Brasileiro - Aplicação de Catálogo de Filmes

Uma aplicação web moderna desenvolvida em React com TypeScript para exibir um catálogo completo de filmes brasileiros. A aplicação permite buscar, filtrar e visualizar informações detalhadas sobre os grandes clássicos do cinema nacional.

## 📋 Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Funcionalidades](#funcionalidades)
5. [Como Executar](#como-executar)
6. [Explicação Detalhada](#explicação-detalhada)
7. [Fluxo de Dados](#fluxo-de-dados)
8. [APIs Utilizadas](#apis-utilizadas)

---

## 🎯 Sobre o Projeto

Esta é uma Single Page Application (SPA) desenvolvida com React que apresenta um catálogo interativo de filmes brasileiros. Os usuários podem:

- Visualizar uma lista de filmes brasileiros
- Filtrar filmes por gênero, ano, prêmios e busca por nome
- Ver detalhes completos de cada filme
- Descobrir onde assistir aos filmes (streaming, alugar, comprar)
- Navegar por filmes do mesmo diretor
- Ver filmes relacionados por gênero

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática
- **Redux Toolkit** - Gerenciamento de estado global da aplicação
- **React Router DOM** - Roteamento e navegação entre páginas
- **Vite** - Ferramenta de build rápida e moderna

### Autenticação
- **Firebase Authentication** - Serviço de autenticação de usuários

### APIs Externas
- **TMDb API** - The Movie Database (busca de filmes e informações)
- **OMDb API** - Open Movie Database (dados complementares de filmes)

### Testes e Qualidade
- **Vitest** - Framework de testes unitários
- **Storybook** - Documentação e visualização de componentes
- **ESLint** - Linter para garantir qualidade do código

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AuthListener/   # Componente que escuta mudanças de autenticação
│   ├── DirectorCard/   # Card com informações do diretor
│   ├── FilterBar/      # Barra de filtros (busca, gênero, ano, prêmios)
│   ├── FilterInput/    # Campo de input para busca
│   ├── FilterSelect/   # Select dropdown para filtros
│   ├── Login/          # Componente de login
│   ├── MovieCard/      # Card individual de filme
│   ├── MovieList/      # Lista de filmes com scroll infinito
│   ├── Navbar/         # Barra de navegação superior
│   └── ProtectedRoute/ # Componente que protege rotas autenticadas
│
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página principal com lista de filmes
│   ├── Login/          # Página de login
│   ├── MovieDetail/    # Página de detalhes do filme
│   ├── Register/       # Página de registro
│   └── Welcome/        # Página de boas-vindas
│
├── services/           # Serviços de API e lógica de negócio
│   ├── authService.ts  # Serviços de autenticação (Firebase)
│   ├── moviesService.ts # Serviço principal de filmes
│   ├── omdbService.ts  # Integração com API OMDb
│   └── tmdbService.ts  # Integração com API TMDb
│
├── store/              # Gerenciamento de estado (Redux)
│   ├── slices/         # Reducers do Redux
│   │   ├── authSlice.ts    # Estado de autenticação
│   │   └── moviesSlice.ts  # Estado de filmes
│   ├── hooks.ts        # Hooks customizados do Redux
│   └── store.ts        # Configuração da store do Redux
│
├── styles/             # Arquivos CSS
│   └── [Componente].css # Estilos específicos de cada componente
│
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Tipos compartilhados da aplicação
│
├── routes/             # Configuração de rotas
│   └── Routes.tsx      # Definição de todas as rotas da aplicação
│
├── hooks/              # Hooks customizados
│   └── useInfiniteScroll.ts # Hook para scroll infinito
│
├── config/             # Arquivos de configuração
│   ├── firebase.ts     # Configuração do Firebase
│   ├── omdb.ts         # Configuração da API OMDb
│   └── tmdb.ts         # Configuração da API TMDb
│
├── App.tsx             # Componente raiz da aplicação
└── main.tsx            # Ponto de entrada da aplicação
```

---

## ✨ Funcionalidades

### 1. Autenticação
- **Login**: Usuários podem fazer login com email e senha
- **Registro**: Novos usuários podem criar uma conta
- **Proteção de Rotas**: Páginas protegidas redirecionam para login se não autenticado
- **Redirecionamento Inteligente**: Após login, usuário é redirecionado para a página que tentou acessar

### 2. Catálogo de Filmes
- **Lista de Filmes**: Visualização de até 100 filmes brasileiros
- **Scroll Infinito**: Carregamento automático de mais filmes ao rolar a página
- **Busca por Nome**: Campo de busca para encontrar filmes específicos
- **Filtros Avançados**:
  - Por Gênero (Drama, Comédia, Ação, etc.)
  - Por Ano de Lançamento
  - Por Status de Prêmios (Premiados/Não Premiados)

### 3. Detalhes do Filme
- **Informações Completas**: Título, ano, gênero, diretor
- **Onde Assistir**: Links para plataformas de streaming, aluguel e compra
- **Diretor**: Lista de todos os filmes do mesmo diretor
- **Filmes Relacionados**: Sugestões baseadas no gênero

### 4. Interface
- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Header Fixo**: Header fixo no topo durante o scroll
- **Navegação Intuitiva**: Barra de navegação sempre visível

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase (para autenticação)
- API Keys do TMDb e OMDb (opcionais, mas recomendadas)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd filmesBrasileiros/NOVO
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_FIREBASE_API_KEY=sua-chave-do-firebase
VITE_FIREBASE_AUTH_DOMAIN=seu-auth-domain
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
VITE_FIREBASE_APP_ID=seu-app-id
VITE_TMDB_API_KEY=sua-chave-tmdb
VITE_OMDB_API_KEY=sua-chave-omdb
```

4. **Execute a aplicação**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

---

## 📚 Explicação Detalhada

### Como a Aplicação Funciona

#### 1. Fluxo de Inicialização

Quando a aplicação é carregada:

1. **main.tsx** é o primeiro arquivo executado
2. Ele renderiza o componente **App.tsx** dentro de um **Provider** do Redux e **BrowserRouter** do React Router
3. **App.tsx** renderiza:
   - **AuthListener**: Monitora o estado de autenticação do usuário
   - **Navbar**: Barra de navegação superior
   - **AppRoutes**: Define todas as rotas da aplicação

#### 2. Sistema de Rotas

O arquivo `routes/Routes.tsx` define todas as rotas:

- `/` → Redireciona para `/login`
- `/login` → Página de login (pública)
- `/register` → Página de registro (pública)
- `/welcome` → Página de boas-vindas (protegida)
- `/home` → Página principal com filmes (protegida)
- `/movie/:id` → Detalhes do filme (protegida)

**ProtectedRoute** envolve as rotas protegidas e verifica se o usuário está autenticado. Se não estiver, redireciona para `/login` salvando a rota original.

#### 3. Gerenciamento de Estado (Redux)

A aplicação usa **Redux Toolkit** para gerenciar o estado global:

**authSlice.ts**:
- Gerencia o estado de autenticação
- Armazena dados do usuário
- Controla se o usuário está logado

**moviesSlice.ts**:
- Gerencia a lista de filmes
- Controla filtros ativos
- Gerencia paginação
- Armazena filme atual sendo visualizado
- Controla estados de loading e erro

#### 4. Carregamento de Filmes

Quando a página Home é carregada:

1. O componente dispara a ação `loadMovies(1)` do Redux
2. O Redux chama `fetchMovies(1)` do `moviesService.ts`
3. O serviço verifica se há filmes em cache
4. Se não houver, busca da API:
   - Primeiro tenta TMDb (até 100 filmes)
   - Se falhar, tenta OMDb
   - Se falhar, usa dados mockados (fallback)
5. Os filmes são paginados (8 por página)
6. O resultado é armazenado no Redux
7. Os componentes reagem às mudanças no estado

#### 5. Sistema de Filtros

Os filtros funcionam da seguinte forma:

1. Usuário seleciona um filtro (gênero, ano, prêmio, busca)
2. A ação `setFilters` atualiza o estado no Redux
3. O Redux aplica os filtros automaticamente usando a função `applyFilters`
4. A lista de filmes é atualizada em tempo real
5. O scroll infinito continua funcionando com os filmes filtrados

#### 6. Scroll Infinito

O hook `useInfiniteScroll` implementa o scroll infinito:

1. Observa quando o usuário rola até o final da lista
2. Quando o elemento observado entra na tela, dispara `handleLoadMore`
3. Carrega a próxima página de filmes
4. Os novos filmes são adicionados à lista existente

#### 7. Detalhes do Filme

Quando o usuário clica em um filme:

1. Navega para `/movie/:id`
2. O componente `MovieDetail` carrega os detalhes
3. Busca informações adicionais:
   - Filmes do mesmo diretor
   - Filmes do mesmo gênero
   - Onde assistir (watch providers do TMDb)
4. Exibe todas as informações formatadas

---

## 🔄 Fluxo de Dados

```
Usuário (Interface)
    ↓
Componente React (ex: Home.tsx)
    ↓
Ação Redux (ex: loadMovies())
    ↓
Redux Middleware (Thunk)
    ↓
Service (ex: moviesService.ts)
    ↓
API Externa (TMDb/OMDb)
    ↓
Resposta da API
    ↓
Redux Reducer (atualiza estado)
    ↓
Componente Re-renderiza com novos dados
```

---

## 🌐 APIs Utilizadas

### TMDb (The Movie Database)
- **Busca de filmes**: Endpoint `/discover/movie` para buscar filmes brasileiros
- **Detalhes do filme**: Endpoint `/movie/{id}` para informações completas
- **Créditos**: Endpoint `/movie/{id}/credits` para buscar diretor
- **Watch Providers**: Endpoint `/movie/{id}/watch/providers` para onde assistir

### OMDb (Open Movie Database)
- **Busca por título**: Busca filmes por nome e ano
- **Busca por IMDb ID**: Busca específica usando ID do IMDb

### Firebase Authentication
- **Autenticação**: Login e registro de usuários
- **Sessão**: Gerenciamento de sessão do usuário

---

## 🎨 Estrutura de Componentes

### Componentes Principais

#### MovieCard
Componente que exibe um cartão individual de filme.
- **Props**: id, name, model (ano), image
- **Funcionalidade**: Ao clicar, navega para a página de detalhes

#### MovieList
Lista de filmes com scroll infinito.
- **Estado**: Recebe lista de filmes do Redux
- **Funcionalidade**: Renderiza MovieCards e implementa scroll infinito

#### FilterBar
Barra de filtros completa.
- **Componentes filhos**: FilterInput (busca), FilterSelect (dropdowns)
- **Estado**: Gerencia filtros localmente e atualiza Redux

#### MovieDetail
Página de detalhes completa do filme.
- **Estado**: Carrega filme atual, filmes relacionados, watch providers
- **Funcionalidade**: Exibe informações completas e relacionados

---

## 🔐 Segurança

- **Rotas Protegidas**: Páginas sensíveis só acessíveis para usuários autenticados
- **Firebase Auth**: Autenticação segura gerenciada pelo Firebase
- **Environment Variables**: Chaves de API armazenadas em variáveis de ambiente
- **Validação**: Formulários validados antes do envio

---

## 📝 Conceitos Importantes para Iniciantes

### 1. React
- **Componentes**: Funções que retornam JSX (HTML dentro do JavaScript)
- **Props**: Dados passados de um componente pai para filho
- **State**: Dados que podem mudar e causam re-renderização
- **Hooks**: Funções especiais (useState, useEffect, etc.) que adicionam funcionalidades

### 2. TypeScript
- **Tipos**: Define o formato esperado dos dados
- **Interfaces**: Estruturas de dados customizadas
- **Type Safety**: Previne erros em tempo de desenvolvimento

### 3. Redux
- **Store**: Local centralizado onde o estado é armazenado
- **Actions**: Ações que descrevem o que aconteceu
- **Reducers**: Funções que atualizam o estado baseado nas ações
- **Selectors**: Funções que extraem dados específicos do estado

### 4. React Router
- **Routes**: Define quais componentes renderizar para cada URL
- **Navigation**: Navegação programática entre páginas
- **Params**: Parâmetros dinâmicos nas URLs (ex: /movie/:id)

---

## 🐛 Debugging e Desenvolvimento

### Logs no Console
A aplicação tem logs úteis no console do navegador:
- Busca de filmes da API
- Estado do Redux
- Erros de autenticação

### Ferramentas de Desenvolvimento
- **React DevTools**: Extensão do navegador para inspecionar componentes
- **Redux DevTools**: Extensão para ver o estado do Redux em tempo real

---

## 📖 Próximos Passos para Aprender

1. **Entenda React**: Aprenda sobre componentes, props, state e hooks
2. **Aprenda TypeScript**: Comece com tipos básicos e interfaces
3. **Estude Redux**: Entenda o fluxo de dados unidirecional
4. **Explore as APIs**: Teste os endpoints manualmente para entender os dados
5. **Leia o código**: Comece pelos componentes simples e vá para os mais complexos

---

## 🤝 Contribuindo

Este é um projeto de aprendizado. Sinta-se livre para:
- Fazer fork do projeto
- Criar branches para novas funcionalidades
- Fazer pull requests com melhorias

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

## 📧 Dúvidas?

Se tiver dúvidas sobre a aplicação, recomendamos:
1. Ler a documentação do React: https://react.dev
2. Estudar Redux Toolkit: https://redux-toolkit.js.org
3. Explorar o código fonte e comentários

---

**Desenvolvido com ❤️ para o aprendizado de desenvolvimento web moderno**

