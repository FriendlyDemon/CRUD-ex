create database catalogo_produtos;
--
use catalogo_produtos;
create table produtos(
id int auto_increment primary key,
nome varchar(255),
descricao text,
preco decimal(10,2)
);

insert into produtos (nome,descricao,preco) values (?,?,?);

