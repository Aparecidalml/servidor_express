create database bd_academico;

use bd_academico;

create table cursos(
	idCurso int not null 
	auto_increment primary key,
	cod int not null,
	curso varchar(50) not null,
	ch int not null,
	tipo varchar(20) not null
);

create table alunos(
	idAluno int not null 
	auto_increment primary key,
	matricula varchar(15) not null,
	nome varchar(100) not null,
	email varchar(100) not null,
	telefone varchar(11) not null,
	idCurso_aluno int,
	foreign key (idCurso_aluno) 
	references cursos(idCurso)
);

insert into cursos (cod, curso, ch, tipo) values 
(001, 'Desenvolvimento de Sistema', 1200, 'Técnico');

insert into cursos (cod, curso, ch, tipo) values 
(002, 'Enfermagem', 1500, 'Técnico');


select * from cursos;





















