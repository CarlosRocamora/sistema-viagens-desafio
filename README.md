# Sistema de Viagens - Testes E2E

Repositório de testes end-to-end (E2E) para o sistema de viagens, desenvolvido com TypeScript e Playwright. 

## Introdução

Este projeto foi desenvolvido para realizar testes automatizados E2E no sistema de viagens disponível em `https://sistema-viagens-qa.netlify.app`. Os testes cobrem as principais funcionalidades do sistema, incluindo:

- Agendamento de viagens (Standard, Executivo e Compartilhado)
- Consulta de viagens agendadas
- Geração de relatórios
- Validações de campos obrigatórios
- Aplicação de descontos e cálculos de valores

O projeto utiliza o padrão Page Object Model (POM) para manter os testes organizados, reutilizáveis e fáceis de manter.

## Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação para desenvolvimento tipado
- **Playwright**: Framework de automação de testes E2E
- **Node.js**: Ambiente de execução JavaScript
- **npm**: Gerenciador de pacotes

### Dependências Principais

- `@playwright/test`: ^1.58.2
- `@types/node`: ^25.2.3

## Estrutura do Repositório

```
sistema-viagens-desafio/
├── .github/
│   └── workflows/          # Configurações de CI/CD
├── tests/
│   ├── e2e/                 # Testes end-to-end
│   │   ├── agendarViagem.spec.ts
│   │   ├── consultarViagens.spec.ts
│   │   └── relatorios.spec.ts
│   └── support/             # Arquivos de suporte
│       ├── fixtures/        # Dados de teste (fixtures)
│       │   └── viagem.json
│       ├── helpers/         # Funções auxiliares
│       │   └── obterDataAtual.ts
│       ├── pages/           # Page Objects
│       │   ├── AgendarViagemPage.ts
│       │   ├── CommonPage.ts
│       │   ├── ConsultarViagensPage.ts
│       │   └── RelatoriosPage.ts
│       └── index.ts         # Configuração de fixtures customizadas
├── playwright.config.ts     # Configuração do Playwright
├── package.json             # Dependências e scripts do projeto
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Documentação do projeto
```

## Objetivo de Cada Grupo de Arquivos

### `/tests/e2e/`
Contém os arquivos de teste E2E organizados por funcionalidade:
- **agendarViagem.spec.ts**: Testes relacionados ao agendamento de viagens, incluindo validações de campos, diferentes tipos de viagem (Standard, Executivo, Compartilhado) e aplicação de descontos
- **consultarViagens.spec.ts**: Testes para consulta e visualização de viagens agendadas
- **relatorios.spec.ts**: Testes para geração e visualização de relatórios

### `/tests/support/pages/`
Implementa o padrão Page Object Model (POM), encapsulando a lógica de interação com cada página:
- **AgendarViagemPage.ts**: Métodos para interagir com a página de agendamento de viagens
- **ConsultarViagensPage.ts**: Métodos para interagir com a página de consulta de viagens
- **RelatoriosPage.ts**: Métodos para interagir com a página de relatórios
- **CommonPage.ts**: Métodos comuns compartilhados entre diferentes páginas

### `/tests/support/fixtures/`
Armazena dados de teste reutilizáveis:
- **viagem.json**: Contém diferentes cenários de dados de viagem para uso nos testes (viagem válida, executivo, compartilhado, distância negativa, desconto, etc.)

### `/tests/support/helpers/`
Contém funções auxiliares reutilizáveis:
- **obterDataAtual.ts**: Função utilitária para obter a data atual no formato necessário para os testes

### `/tests/support/index.ts`
Configuração de fixtures customizadas do Playwright, estendendo o objeto `page` com instâncias das Page Objects, facilitando o acesso aos métodos de cada página diretamente através do contexto de teste.

### `playwright.config.ts`
Arquivo de configuração principal do Playwright, contendo:
- Configuração de browsers (Chromium, Firefox, WebKit)
- URL base da aplicação
- Configurações de retry e workers
- Configurações de relatórios e traces

## Modo de Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/CarlosRocamora/sistema-viagens-desafio.git
```

2. Navegue até o diretório do projeto:
```bash
cd sistema-viagens-desafio
```

3. Instale as dependências:
```bash
npm install
```

4. Instale os browsers do Playwright:
```bash
npx playwright install
```

## Modo de Execução

### Executar Todos os Testes

Para executar todos os testes em todos os browsers configurados:
```bash
npx playwright test
```

### Executar Testes em um Browser Específico

Para executar apenas no Chromium:
```bash
npx playwright test --project=chromium
```

Para executar apenas no Firefox:
```bash
npx playwright test --project=firefox
```

Para executar apenas no WebKit (Safari):
```bash
npx playwright test --project=webkit
```

### Executar um Arquivo de Teste Específico

Para executar apenas os testes de agendamento:
```bash
npx playwright test tests/e2e/agendarViagem.spec.ts
```

Para executar apenas os testes de consulta:
```bash
npx playwright test tests/e2e/consultarViagens.spec.ts
```

Para executar apenas os testes de relatórios:
```bash
npx playwright test tests/e2e/relatorios.spec.ts
```

### Executar em Modo UI (Interativo)

Para executar os testes com a interface gráfica do Playwright:
```bash
npx playwright test --ui
```

### Executar em Modo Debug

Para executar os testes em modo debug:
```bash
npx playwright test --debug
```

### Visualizar Relatório HTML

Após a execução dos testes, você pode visualizar o relatório HTML:
```bash
npx playwright show-report
```

### Executar em Modo Headed (Com Browser Visível)

Por padrão, os testes executam em modo headless. Para ver os browsers durante a execução:
```bash
npx playwright test --headed
```

## Configurações Adicionais

O arquivo `playwright.config.ts` pode ser customizado para ajustar:
- URL base da aplicação
- Timeout dos testes
- Número de workers (paralelismo)
- Configurações de retry
- Browsers e dispositivos a serem testados

## Links Úteis

- [Documentação do Playwright](https://playwright.dev/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)
- [Repositório no GitHub](https://github.com/CarlosRocamora/sistema-viagens-desafio)
