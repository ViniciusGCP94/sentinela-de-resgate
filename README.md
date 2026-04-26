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
- **Tabela Persons:** Coração do sistema, com status de resgate, flags de equipamentos vitais e contato familiar para localização de desaparecidos.
- **Tabela Medications:** Medicamentos de uso contínuo vinculados a cada pessoa, permitindo que equipes de resgate saibam o que levar antes de chegar ao local.
- **Tabela Material Needs:** Necessidades materiais individuais com rastreamento de atendimento, resolvendo o desequilíbrio de doações documentado nas enchentes do RS de 2024.
- **LGPD:** Registro obrigatório de consentimento para tratamento de dados sensíveis.
- **Normalização:** Separação de medicamentos e necessidades materiais em tabelas próprias para relatórios logísticos precisos.

> [Visualize o Diagrama de Entidade-Relacionamento aqui](https://dbdiagram.io/d/Sentinela-de-Resgate-69eb8014ddb9320fdc42d3f6)



## 🖥️ Backend (Arquitetura e Implementação)

O núcleo da aplicação foi desenvolvido seguindo o padrão **MVC (Model-View-Controller)**, garantindo uma separação clara entre a lógica de persistência, as regras de negócio e a exposição de dados.

### 🛠️ Stack Técnica
- **Runtime:** Node.js com suporte nativo a **ES Modules** (`import/export`).
- **Framework:** Express 5.
- **Banco de Dados:** **PostgreSQL** com `pg-pool` para gestão eficiente de conexões.
- **Segurança:**
  - `bcryptjs`: Hashing de senhas para armazenamento seguro.
  - `jsonwebtoken (JWT)`: Autenticação stateless com tokens configurados para expiração em **8 horas**.
- **Gestão de Ambiente:** `dotenv` para proteção de segredos e `cors` para controle de origens.

### 🔒 Segurança e Governança de Acesso (RBAC)
O sistema implementa **Controle de Acesso Baseado em Funções (Role-Based Access Control)**, protegendo informações sensíveis de cidadãos em áreas de risco:

- **Middleware `autenticar`:** Intercepta requisições e valida a integridade do Bearer Token.
- **Middleware `autorizar`:** Valida se o cargo do usuário (`role`) possui permissão para o recurso solicitado.
- **Fluxo de Permissões:**
  - **ACS:** Cadastra pessoas, registra medicamentos e necessidades materiais.
  - **Defesa Civil:** Visão global de todos os cadastros, atualiza status de resgate e marca necessidades como atendidas.

### 🏗️ Estrutura de Pastas do Backend
```text
backend/src/
├── config/      # Configuração da conexão com PostgreSQL (pool)
├── controllers/ # Lógica de processamento das requisições
├── middlewares/ # Camada de segurança (JWT e RBAC)
├── models/      # Queries SQL e interação com o banco
├── routes/      # Definição e proteção dos endpoints
└── app.js       # Configuração global do Express
```

### 📡 API Endpoints

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autenticação e geração de token | Público |
| `POST` | `/api/usuarios/registro` | Registro de novos agentes | Público |
| `GET` | `/api/usuarios/` | Listagem global de agentes | **Defesa Civil** |
| `GET` | `/api/health` | Status de saúde do servidor | Público |
| `POST` | `/api/pessoas/` | Cadastro de pessoa vulnerável | **ACS** |
| `GET` | `/api/pessoas/` | Listagem com filtros de bairro e status | **Autenticado** |
| `PATCH` | `/api/pessoas/:id/status` | Atualização do status de resgate | **Defesa Civil** |
| `POST` | `/api/medicamentos/` | Registro de medicamento de uso contínuo | **ACS** |
| `GET` | `/api/medicamentos/:person_id` | Listagem de medicamentos por pessoa | **Autenticado** |
| `DELETE` | `/api/medicamentos/:id` | Remoção de medicamento | **ACS** |
| `POST` | `/api/materiais/` | Registro de necessidade material | **ACS** |
| `GET` | `/api/materiais/:person_id` | Listagem de necessidades por pessoa | **Autenticado** |
| `PATCH` | `/api/materiais/:id/atender` | Marca necessidade como atendida | **Defesa Civil** |
| `DELETE` | `/api/materiais/:id` | Remoção de necessidade material | **ACS** |

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ViniciusGCP94/sentinela-de-resgate.git

# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Copie o arquivo de ambiente
cp .env.example .env
# Preencha as variáveis no .env com seus dados locais

# Configure o banco de dados
# Execute database/schema.sql e depois database/seed.sql no PostgreSQL

# Rode o servidor
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.


## 🎨 Frontend (Em desenvolvimento)

### Stack
- **Framework:** React 18 com Vite
- **Estilização:** SCSS com variáveis, mixins e BEM
- **Roteamento:** React Router DOM v6
- **HTTP:** Axios com interceptor de token JWT

### Decisão de design
A identidade visual segue o padrão do Governo do RS — azul `#003366` como cor primária,
tipografia Source Sans 3 para legibilidade em situações de emergência, e badges coloridos
por status de resgate para leitura rápida em campo.

### Por que SCSS e não Tailwind?
SCSS permite criar um sistema de design próprio com variáveis semânticas (`$cor-status-nao-localizada`)
que comunicam intenção — não apenas aparência. Em um sistema governamental, clareza de
nomenclatura é tão importante quanto clareza visual.