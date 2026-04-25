-- =============================================================
-- SEED — Sentinela de Resgate
-- Dados de teste para desenvolvimento
-- ATENÇÃO: Não executar em produção
-- =============================================================

-- 1. USUÁRIOS
-- Dois perfis distintos para testar as permissões do sistema
INSERT INTO "users" ("name", "email", "password", "role") 
VALUES 
('Vinicius ACS',      'vinicius@email.com',      'senha_hash_provisoria', 'acs'),
('Ana Defesa Civil',  'ana@defesacivil.com',      'senha_hash_provisoria', 'defesa_civil');

-- 2. PESSOAS VULNERÁVEIS
-- Três casos com status diferentes para cobrir todos os cenários de teste:
-- em_casa, resgatada e nao_localizada
INSERT INTO "persons" (
  "name", "cpf", "birth_date", "phone",
  "address", "neighborhood", "city", "zip_code",
  "status",
  "needs_vital_equipment", "vital_equipment_description",
  "family_contact_name", "family_contact_phone",
  "consent", "registered_by"
)
VALUES 
(
  'João Ramos', '123.456.789-10', '1948-03-15', '51-99111-2233',
  'Rua São José, 100', 'Arroio Grande', 'Santa Cruz do Sul', '96810-000',
  'em_casa',
  true, 'Concentrador de Oxigênio',
  'Maria Silva', '51-99999-9999',
  true, 1
),
(
  'Maria Oliveira', '987.654.321-11', '1955-07-22', '51-99444-5566',
  'Av. Imigrante, 500', 'Centro', 'Santa Cruz do Sul', '96815-000',
  'resgatada',
  false, NULL,
  'José Oliveira', '51-99777-8888',
  true, 1
),
(
  'Carlos Souza', '444.555.666-77', '1940-11-05', '51-99222-3344',
  'Rua 28 de Setembro, 10', 'Centro', 'Santa Cruz do Sul', '96815-000',
  'nao_localizada',
  false, NULL,
  'Lucia Souza', '51-88888-8888',
  true, 1
);

-- 3. MEDICAMENTOS
-- Vinculados ao João (id=1) — idoso com equipamento vital
INSERT INTO "medications" ("person_id", "name", "dosage", "frequency", "notes")
VALUES 
(1, 'Metformina',  '500mg', '2x ao dia',  'Tomar com as refeições'),
(1, 'Losartana',   '50mg',  '1x ao dia',  'Tomar pela manhã'),
(2, 'Sinvastatina','20mg',  '1x ao dia',  'Tomar à noite');

-- 4. NECESSIDADES MATERIAIS
-- Casos pendentes e um já atendido para testar o campo fulfilled
INSERT INTO "material_needs" ("person_id", "category", "description", "fulfilled", "fulfilled_at")
VALUES 
(1, 'Alimentação', 'Cesta básica e água potável',          false, NULL),
(1, 'Cobertor',    '2 cobertores para o casal',            false, NULL),
(2, 'Roupa',       'Roupas femininas tamanho M',           false, NULL),
(3, 'Alimentação', 'Cesta básica urgente',                 false, NULL),
(3, 'Colchão',     'Colchão de solteiro',                  true,  now());