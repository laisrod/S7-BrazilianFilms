# Cinema Brasileiro

Aplicação React para exibir informações sobre filmes brasileiros com um layout inspirado nas cores da bandeira brasileira (verde e amarelo).

## Tecnologias

- React 18
- Vite
- Redux Toolkit
- React Router
- Storybook
- Dados mockados de filmes brasileiros

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── MovieCard/      # Card de filme individual
│   └── MovieList/      # Lista de filmes
├── pages/              # Páginas da aplicação
│   └── Home/           # Página principal
├── services/           # Serviços de API
│   └── moviesService.js # Dados de filmes brasileiros
└── store/              # Gerenciamento de estado Redux
    ├── store.js        # Configuração da store
    └── slices/         # Slices Redux
        └── moviesSlice.js
```

## Exercício 1 - Implementado ✅

- ✅ Tela principal com lista completa de filmes brasileiros
- ✅ Exibição de **Nome** e **Ano** de cada filme
- ✅ Layout com cores verde e amarelo (bandeira brasileira)
- ✅ Redux Toolkit para gerenciamento de estado
- ✅ Componentes criados com Storybook
- ✅ Design responsivo e moderno

## Paleta de Cores

- **Verde Escuro**: #004d2a (background)
- **Verde**: #006b3c (cards e header)
- **Verde Claro**: #008f39 (gradientes)
- **Amarelo**: #ffd700 (títulos e destaques)
- **Amarelo Claro**: #ffed4e (detalhes)

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Executar Storybook

```bash
npm run storybook
```

O Storybook estará disponível em `http://localhost:6006`

## Build

```bash
npm run build
```

## Componentes no Storybook

- **MovieCard**: Exibe nome e ano de um filme brasileiro
- **MovieList**: Lista de filmes com estados de loading e error

## Filmes Incluídos

A aplicação inclui uma seleção de filmes brasileiros famosos como:
- Cidade de Deus (2002)
- O Auto da Compadecida (2000)
- Central do Brasil (1998)
- Tropa de Elite (2007)
- E muitos outros...
