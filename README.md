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