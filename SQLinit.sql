-- tabela aluno
CREATE TABLE aluno (
  matricula VARCHAR PRIMARY KEY,
  nome VARCHAR NOT NULL,
  curso VARCHAR NOT NULL
);

-- tabela disciplina
CREATE TABLE disciplina (
  codigo VARCHAR PRIMARY KEY,
  nome VARCHAR NOT NULL,
  vagas INT NOT NULL
);

-- tabela matricula
CREATE TABLE matricula (
  id SERIAL PRIMARY KEY,
  matricula_aluno VARCHAR REFERENCES aluno(matricula),
  codigo_disciplina VARCHAR REFERENCES disciplina(codigo),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO aluno (matricula, nome, curso) VALUES
('20230001', 'João Silva', 'Ciência da Computação'),
('20230002', 'Maria Oliveira', 'Engenharia Civil'),
('20230003', 'Carlos Pereira', 'Administração'),
('20230004', 'Ana Santos', 'Medicina'),
('20230005', 'Pedro Costa', 'Direito'),
('20230006', 'Juliana Almeida', 'Psicologia'),
('20230007', 'Lucas Fernandes', 'Engenharia Elétrica'),
('20230008', 'Mariana Ribeiro', 'Arquitetura'),
('20230009', 'Fernando Souza', 'Economia'),
('20230010', 'Patrícia Lima', 'Enfermagem');

INSERT INTO disciplina (codigo, nome, vagas) VALUES
('CC101', 'Introdução à Programação', 30),
('CC102', 'Estruturas de Dados', 25),
('EC201', 'Cálculo I', 40),
('EC202', 'Física Geral', 35),
('AD301', 'Contabilidade Básica', 30),
('ME401', 'Anatomia Humana', 20),
('DI501', 'Direito Constitucional', 30),
('PS601', 'Psicologia Cognitiva', 25),
('EE701', 'Circuitos Elétricos', 30),
('AR801', 'Desenho Arquitetônico', 20);

INSERT INTO matricula (matricula_aluno, codigo_disciplina) VALUES
('20230001', 'CC101'),
('20230001', 'CC102'),
('20230002', 'EC201'),
('20230002', 'EC202'),
('20230003', 'AD301'),
('20230004', 'ME401'),
('20230005', 'DI501'),
('20230006', 'PS601'),
('20230007', 'EE701'),
('20230008', 'AR801'),
('20230009', 'CC101'),
('20230009', 'EC201'),
('20230010', 'ME401'),
('20230010', 'PS601'),
('20230001', 'EC201'),
('20230002', 'CC101'),
('20230003', 'CC102'),
('20230004', 'PS601'),
('20230005', 'AD301'),
('20230006', 'DI501');

select * from aluno
select * from disciplina
select * from matricula