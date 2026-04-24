-- 1. Criar um usuário (Agente de Saúde)
INSERT INTO "users" ("name", "email", "password", "role") 
VALUES ('Vinicius ACS', 'vinicius@email.com', 'senha_hash_provisoria', 'admin');

-- 2. Criar cidadãos (Bairros de Santa Cruz do Sul)
INSERT INTO "persons" ("name", "cpf", "address", "neighborhood", "city", "consent", "registered_by", "needs_vital_equipment", "vital_equipment_description")
VALUES 
('João da Silva', '123.456.789-00', 'Rua São José, 100', 'Arroio Grande', 'Santa Cruz do Sul', true, 1, true, 'Concentrador de Oxigênio'),
('Maria Oliveira', '987.654.321-11', 'Av. Imigrante, 500', 'Centro', 'Santa Cruz do Sul', true, 1, false, NULL);

-- 3. Criar uma necessidade urgente
INSERT INTO "material_needs" ("person_id", "category", "description")
VALUES (2, 'Alimentação', 'Cesta básica e água potável');