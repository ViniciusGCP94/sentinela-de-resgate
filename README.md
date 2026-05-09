# 🛡️ Sentinela de Resgate

Sistema de gestão de pessoas vulneráveis em situações de enchente, desenvolvido como resposta direta aos problemas documentados nas enchentes do Rio Grande do Sul em 2024.

A plataforma conecta **Agentes Comunitários de Saúde (ACS)**, que cadastram pessoas em campo antes e durante a crise, com a **Defesa Civil**, que monitora, coordena resgates e distribui recursos com base em dados reais.

---

## 🌐 Deploy

🔗 **API:** https://sentinela-de-resgate-production.up.railway.app  
🔗 **Frontend:** https://sentinela-de-resgate.vercel.app  
🔗 **Documentação:** https://documenter.getpostman.com/view/53429133/2sBXqNkHiY

---

## 🚀 O Problema

Durante as enchentes do RS de 2024, dois problemas críticos foram documentados:

1. **Defesa Civil operava sem dados prévios** — equipes chegavam aos bairros sem saber quem dependia de oxigênio, insulina ou outros equipamentos vitais, tornando o resgate reativo em vez de proativo.
2. **Doações chegavam sem direcionamento** — alguns abrigos recebiam cobertores em excesso enquanto outros não tinham colchões, por falta de um canal centralizado de necessidades.

---

## 💡 A Solução

O Sentinela de Resgate permite que ACS cadastrem pessoas vulneráveis **antes da crise acontecer**, com seus medicamentos, necessidades materiais e contato familiar. Quando a enchente chega, a Defesa Civil acessa um painel com dados precisos por bairro, sabe exatamente onde ir e o que levar.

---

## 🖥️ Demonstração

**Fluxo ACS:**
Login → Cadastrar pessoa → Adicionar medicamentos → Registrar necessidades materiais

**Fluxo Defesa Civil:**
Login → Painel com indicadores → Filtrar por bairro/status → Atualizar status de resgate → Marcar necessidades como atendidas

---

## 📊 Banco de Dados

Modelagem pensada para priorizar a vida e a transparência em situações de emergência.

| Tabela | Responsabilidade |
|--------|-----------------|
| `users` | Agentes do sistema com dois perfis: `acs` e `defesa_civil` |
| `persons` | Núcleo do sistema — localização, status de resgate, equipamentos vitais e contato familiar |
| `medications` | Medicamentos de uso contínuo por pessoa — equipes sabem o que levar antes de chegar |
| `material_needs` | Necessidades materiais com rastreamento de atendimento (`fulfilled`) |

**Decisões de modelagem:**
- Campo `consent` obrigatório em `persons` — conformidade com a LGPD
- `ON DELETE CASCADE` em medications e material_needs — sem registros órfãos
- `family_contact_name` e `family_contact_phone` — permite acionar familiar quando pessoa está com status `nao_localizada`
- Campo `fulfilled_at` em material_needs — rastreabilidade de quando cada necessidade foi atendida

> [Visualize o Diagrama de Entidade-Relacionamento](https://dbdiagram.io/d/Sentinela-de-Resgate-69eb8014ddb9320fdc42d3f6)

---

## ⚙️ Backend

Desenvolvido com arquitetura **MVC**, garantindo separação clara entre persistência, regras de negócio e exposição de dados.

### Stack
- **Runtime:** Node.js com ES Modules (`import/export`)
- **Framework:** Express 5
- **Banco de Dados:** PostgreSQL com `pg-pool`
- **Autenticação:** JWT com expiração de 8 horas + bcryptjs
- **Ambiente:** dotenv + cors

### Por que JWT com 8 horas?
8 horas corresponde a um turno de trabalho em campo. Se um tablet da Defesa Civil for perdido durante uma operação, o token expira sozinho sem necessidade de revogação manual.

### Segurança — RBAC (Role-Based Access Control)

Dois middlewares separados espelham responsabilidades distintas:

- **`autenticar`** — verifica identidade via Bearer Token
- **`autorizar`** — verifica permissão por cargo

| Perfil | Permissões |
|--------|-----------|
| **ACS** | Cadastrar pessoas, adicionar/remover medicamentos e necessidades materiais |
| **Defesa Civil** | Visão global, atualizar status de resgate, marcar necessidades como atendidas |

### Estrutura de pastas

```
backend/src/
├── config/       # Conexão com PostgreSQL (pool)
├── controllers/  # Lógica de negócio
├── middlewares/  # Autenticação e autorização (RBAC)
├── models/       # Queries SQL
├── routes/       # Endpoints protegidos
└── app.js        # Configuração global do Express
```

### Endpoints da API

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/api/auth/login` | Autenticação e geração de token | Público |
| `POST` | `/api/usuarios/registro` | Registro de novos agentes | Público |
| `GET` | `/api/usuarios/` | Listagem de agentes | Defesa Civil |
| `GET` | `/api/health` | Status do servidor | Público |
| `POST` | `/api/pessoas/` | Cadastro de pessoa vulnerável | ACS |
| `GET` | `/api/pessoas/` | Listagem com filtros de bairro e status | Autenticado |
| `PATCH` | `/api/pessoas/:id/status` | Atualização do status de resgate | Defesa Civil |
| `POST` | `/api/medicamentos/` | Registro de medicamento | ACS |
| `GET` | `/api/medicamentos/:person_id` | Medicamentos por pessoa | Autenticado |
| `DELETE` | `/api/medicamentos/:id` | Remoção de medicamento | ACS |
| `POST` | `/api/materiais/` | Registro de necessidade material | ACS |
| `GET` | `/api/materiais/:person_id` | Necessidades por pessoa | Autenticado |
| `PATCH` | `/api/materiais/:id/atender` | Marca necessidade como atendida | Defesa Civil |
| `DELETE` | `/api/materiais/:id` | Remoção de necessidade | ACS |

> 📬 [Documentação completa da API no Postman](https://documenter.getpostman.com/view/53429133/2sBXqNkHiY)

---

## 🎨 Frontend

Interface desenvolvida com identidade visual do **Governo do Rio Grande do Sul**, priorizando legibilidade e clareza em situações de emergência.

### Stack
- **Framework:** React 18 + Vite
- **Estilização:** SCSS com CSS Modules e design system próprio
- **Roteamento:** React Router DOM v6
- **HTTP:** Axios com interceptor de token JWT
- **Estado global:** Context API nativa (sem Redux ou Zustand)

### Por que SCSS e não Tailwind?
SCSS permite variáveis semânticas como `$cor-status-nao-localizada` que comunicam **intenção**, não apenas aparência. Em um sistema governamental de emergência, clareza de nomenclatura é tão importante quanto clareza visual.

### Por que Context API e não Zustand?
O estado de autenticação é simples — usuário logado, cargo e funções de login/logout. Adicionar uma dependência externa para isso seria over-engineering. Menos dependências significa menos superfície de ataque e manutenção mais simples.

### Arquitetura de componentes

```
frontend/src/
├── components/
│   ├── Header/        # Cabeçalho com nome, cargo e logout
│   ├── Sidebar/       # Navegação diferente por cargo (ACS vs Defesa Civil)
│   ├── StatusBadge/   # Badge colorido semântico por status de resgate
│   ├── Layout/        # Wrapper de estrutura para páginas autenticadas
│   └── PrivateRoute/  # Proteção de rotas por autenticação e cargo
├── context/
│   └── AuthContext    # Estado global de autenticação
├── pages/
│   ├── Login/         # Login institucional do Governo RS
│   ├── Dashboard/     # Painel com indicadores e alertas
│   ├── Pessoas/       # Listagem com filtros por bairro e status
│   ├── NovaPessoa/    # Formulário de cadastro com seções e LGPD
│   └── DetalhesPessoa/# Gestão operacional por pessoa
├── services/          # Camada de comunicação com a API (SRP)
└── styles/            # Design system — variáveis, mixins, global
```

### Decisões de UX baseadas no problema real

**Redirecionamento por cargo no login:** ACS vai para `/pessoas` (sua função é cadastrar), Defesa Civil vai para `/dashboard` (sua função é monitorar). A interface reflete diretamente as responsabilidades operacionais.

**Sidebar com menus diferentes por cargo:** ACS não vê o painel geral — reduziria ruído e focaria o agente no que importa em campo.

**Coluna de contato familiar na listagem:** Durante as enchentes do RS, equipes precisavam de acesso imediato ao contato de parentes para localizar desaparecidos. Esse dado fica visível sem precisar abrir cada cadastro.

**Dashboard destaca `nao_localizada` para Defesa Civil:** O caso mais urgente operacionalmente aparece em destaque automático, sem precisar filtrar.

**Formulário com 5 seções e botão bloqueado sem LGPD:** Impossível cadastrar sem consentimento registrado — conformidade na interface reflete a obrigação legal.

**Promise.all na tela de detalhes:** Pessoa, medicamentos e materiais carregam em paralelo. Em situações de crise, segundos importam.

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# Preencha as variáveis no .env

# Configure o banco de dados
# Execute database/schema.sql e depois database/seed.sql no seu cliente PostgreSQL

# Rode o servidor
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env
# VITE_API_URL=http://localhost:3000/api

# Rode o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Variáveis de ambiente necessárias

**backend/.env**
```
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
JWT_SECRET=sua_chave_secreta
```

**frontend/.env**
```
VITE_API_URL=http://localhost:3000/api
```

### Usuários para teste

As senhas do seed estão em texto puro e **não funcionam com bcrypt**. Antes de testar o login, crie um usuário real pela rota `POST /api/usuarios/registro`:

```json
{
  "nome": "Seu Nome",
  "email": "seu@email.com",
  "senha": "sua_senha",
  "cargo": "acs"
}
```

Substitua `"cargo"` por `"defesa_civil"` para criar um usuário da Defesa Civil.

---

## 🗂️ Estrutura do repositório

```
sentinela-de-resgate/
├── backend/          # API Node.js + Express
├── frontend/         # Interface React
├── database/
│   ├── schema.sql    # Estrutura das tabelas
│   └── seed.sql      # Dados iniciais de teste
└── README.md
```

---

## 🔮 Roadmap — Versão 2.0

Funcionalidades planejadas documentadas como decisão técnica para não implementar na v1.0 por escopo:

- Cruzamento automático de `nao_localizada` com banco de dados para acionar familiar via notificação
- Relatório de medicamentos necessários por bairro para resgates proativos
- Integração conceitual com e-SUS APS para importar dados já existentes das UBS
- Módulo de abrigos com capacidade e vagas disponíveis
- Responsividade mobile completa para uso em campo
- Deploy do frontend (Vercel)

---

## 👨‍💻 Autor

Desenvolvido por **Vinícius Pereira** como projeto de portfólio fullstack.

Inspirado diretamente pelas enchentes do RS de 2024 e pelos problemas reais documentados durante a crise — onde a falta de dados centralizados custou tempo, recursos e vidas.

[![GitHub](https://img.shields.io/badge/GitHub-ViniciusGCP94-blue?logo=github)](https://github.com/ViniciusGCP94/sentinela-de-resgate)
[![API](https://img.shields.io/badge/API-Railway-purple?logo=railway)](https://sentinela-de-resgate-production.up.railway.app)