
# API de Estatísticas de Transações

Uma aplicação NestJS de alta performance que fornece uma API RESTful para registrar transações e calcular estatísticas em tempo real dos últimos 60 segundos. Construída seguindo princípios de arquitetura limpa e design orientado a domínio.

## Visão Geral do Projeto

Esta aplicação foi projetada para lidar com transações financeiras com validação rigorosa de dados, fornecendo cálculos estatísticos em tempo real sobre os valores das transações. Possui armazenamento em memória para desempenho ideal, mantendo uma arquitetura limpa e de fácil manutenção.

## Arquitetura

O projeto segue os princípios de Arquitetura Limpa (Clean Architecture) e Design Orientado a Domínio (DDD) com as seguintes camadas:

- **Core**: Contém a lógica de negócios e modelos de domínio
  - **Base**: Classes abstratas e interfaces compartilhadas pelo domínio
  - **Domain**: Entidades de domínio e mapeadores
  - **Repositories**: Interfaces de repositório

- **Use Cases**: Regras de negócio específicas da aplicação
  - **Transactions**: Casos de uso para operações de transações
  - **Statistics**: Casos de uso para operações de estatísticas

- **Infrastructure**: Implementações e preocupações externas
  - **Data**: Implementação de armazenamento de dados (cache em memória)
  - **Framework**: Código específico do NestJS (controllers, modules)
  - **Logger**: Implementação de log com Winston

- **Shared**: Utilitários comuns e DTOs

## Recursos Principais

- Criação de transações com valor e timestamp
- Exclusão de todas as transações
- Obtenção de estatísticas em tempo real para transações dos últimos 60 segundos
- Validação de dados e tratamento de erros
- Endpoint de verificação de saúde (health check)
- Limitação de taxa (rate limiting)
- Documentação Swagger
- Implantação com Docker
- Cobertura abrangente de testes

## Endpoints da API

### Transações

- `POST /transactions`: Criar uma nova transação
  - Corpo: `{ "amount": number, "timestamp": string }`
  - Resposta: 201 Created com objeto da transação

- `DELETE /transactions`: Excluir todas as transações
  - Resposta: 204 No Content

### Estatísticas

- `GET /statistics`: Obter estatísticas das transações dos últimos 60 segundos
  - Resposta: `{ "count": number, "sum": number, "avg": number, "min": number, "max": number, "timestamp": string }`

### Saúde

- `GET /health`: Verificar o status de saúde da API

## Instalação

```bash
# Instalar dependências
yarn install
```

## Executando a Aplicação

```bash
# Modo de desenvolvimento
yarn start:dev

# Modo de produção
yarn build
yarn start:prod
```

## Testes

```bash
# Testes unitários
yarn test

# Testes E2E
yarn test:e2e

# Testes com cobertura
yarn test:cov
```

## Suporte Docker

A aplicação pode ser executada em um contêiner Docker usando o Dockerfile e o docker-compose.yml fornecidos:

```bash
# Construir e iniciar o contêiner
docker-compose up -d

# Parar o contêiner
docker-compose down
```

## Tecnologias Utilizadas

- NestJS
- TypeScript
- Jest para testes
- Winston para logging
- Swagger para documentação da API
- Docker para conteinerização
- Class Validator & Class Transformer para validação e transformação

## Estrutura do Projeto

```
src/
  core/              # Núcleo do domínio (entidades, interfaces de repositórios)
  use-cases/         # Casos de uso da aplicação
  infra/             # Implementações de infraestrutura
    data/            # Armazenamento de dados (implementação em memória)
    framework/       # Código específico do NestJS
    logger/          # Implementação de logging
  shared/            # Utilitários compartilhados, DTOs, exceções
```