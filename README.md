# Sentinela de Resgate

O **Sentinela de Resgate** é uma plataforma de gestão de vulneráveis e logística humanitária desenhada para conectar o trabalho dos Agentes Comunitários de Saúde (ACS) com a prontidão operacional da Defesa Civil em cenários de desastres naturais.

## 🚀 O Problema
Em eventos como as enchentes no RS, a falta de dados centralizados gera dois grandes gargalos:
1. A Defesa Civil não sabe quem são as pessoas que dependem de equipamentos vitais (como oxigênio) em cada bairro.
2. Doações chegam aos abrigos de forma desorganizada, gerando excesso de itens em alguns locais e escassez em outros.

## 🛠 Solução
O sistema permite que o ACS utilize seu conhecimento prévio da comunidade para mapear necessidades antes da crise, permitindo que a Defesa Civil execute resgates e distribuições com precisão cirúrgica.

## 📊 Banco de Dados
A modelagem foi pensada para priorizar a vida e a transparência:
- **Tabela Persons:** Coração do sistema, com status de resgate e flags de equipamentos vitais.
- **LGPD:** Registro obrigatório de consentimento para tratamento de dados sensíveis.
- **Normalização:** Separação de medicamentos e necessidades materiais para relatórios logísticos precisos.

> [Visualize o Diagrama de Entidade-Relacionamento aqui](https://dbdiagram.io/d/Sentinela-de-Resgate-69eb8014ddb9320fdc42d3f6)

## 🖥️ Backend (Arquitetura e Implementação)

O núcleo da aplicação foi desenvolvido seguindo o padrão **MVC (Model-View-Controller)**, garantindo uma separação clara entre a lógica de persistência, as regras de negócio e a exposição de dados.

### 🛠️ Stack Técnica
- **Runtime:** Node.js com suporte nativo a **ES Modules** (`import/export`).
- **Framework:** Express 5 (versão com melhorias em performance e tratamento de erros).
- **Banco de Dados:** **PostgreSQL** com utilização de `pg-pool` para gestão eficiente de conexões.
- **Segurança:**
  - `bcryptjs`: Hashing de passwords para armazenamento seguro.
  - `jsonwebtoken (JWT)`: Autenticação stateless com tokens configurados para expiração em **8 horas**.
- **Gestão de Ambiente:** `dotenv` para proteção de segredos e `cors` para controle de origens.

### 🔒 Segurança e Governança de Acesso (RBAC)
Implementámos um controlo de acesso baseado em cargos (**Role-Based Access Control**), vital para proteger informações sensíveis de cidadãos em áreas de risco:

- **Middleware `autenticar`:** Intercepta as requisições para validar a integridade e a validade do Bearer Token.
- **Middleware `autorizar`:** Valida se o cargo do utilizador (`role`) possui permissão para o recurso solicitado.
- **Fluxo de Permissões:**
  - **ACS:** Pode registar pessoas e gerir os seus próprios cadastros.
  - **Defesa Civil:** Possui acesso à listagem global de utilizadores e visão macro dos resgates.

### 🏗️ Estrutura de Pastas do Backend
```text
backend/src/
├── config/      # Configuração da conexão com PostgreSQL
├── controllers/ # Lógica de processamento das requisições
├── middlewares/ # Camada de segurança (JWT e RBAC)
├── models/      # Queries SQL e interação direta com o banco
├── routes/      # Definição e proteção dos endpoints da API
└── app.js       # Configuração global e middlewares do Express
```

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autenticação e geração de token | Público |
| `POST` | `/api/usuarios/registro` | Registo de novos agentes (ACS ou Defesa Civil) | Público |
| `GET` | `/api/usuarios/` | Listagem global de agentes cadastrados | **Defesa Civil** |
| `POST` | `/api/pessoas/` | Cadastro de pessoa vulnerável/desabrigada | **Autenticado** |
| `GET` | `/api/pessoas/` | Listagem de pessoas (com filtros de bairro/status) | **Autenticado** |
| `PATCH` | `/api/pessoas/:id/status` | Atualização do status de resgate/vulnerabilidade | **Autenticado** |
| `GET` | `/api/health` | Status de saúde do servidor | Público |