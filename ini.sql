create database catalogo_produtos;

--
use catalogo_produtos;

create table
    produtos (
        id int auto_increment primary key,
        nome varchar(255) not null,
        descricao text not null,
        preco decimal(10, 2) not null
    );