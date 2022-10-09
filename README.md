# Boas vindas ao repositório do Trybe Futebol Clube!

O TFC é um site informativo sobre partidas e classificações de futebol, desenvolvido durante o módulo de backend no curso de desenvolvimento web na <a href="https://github.com/betrybe">@Trybe</a></li>, com objetivo de entender como se dá a integração entre front e back-end (com banco de dados), e como essa configuração pode ser feita utilizando o Docker Compose!

![Logo](https://raw.githubusercontent.com/PauloEwerson/TFC-Trybe-Futebol-Clube/main/app/frontend/src/images/front-page.png)


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PauloEwerson/TFC-Trybe-Futebol-Clube.svg">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/PauloEwerson/TFC-Trybe-Futebol-Clube.svg">
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/PauloEwerson/TFC-Trybe-Futebol-Clube.svg">

  <a href="https://github.com/PauloEwerson/TFC-Trybe-Futebol-Clube/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PauloEwerson/TFC-Trybe-Futebol-Clube.svg">
  </a>
</p>


## Instalação

Clone o projeto:

``` bash
  $ git clone https://github.com/PauloEwerson/TFC-Trybe-Futebol-Clube.git
```

Entre no diretório:
``` bash
  $ cd TFC-Trybe-Futebol-Clube
```

Instale as dependências:
``` bash
  $ npm install
```

Instale as aplicações:
``` bash
  $ npm run postinstall
```

Subia a orquestração de containers e faça o build da aplicação:
``` bash
  $ npm run compose:up
```

O front-end estará disponível em:
http://localhost:3000

Para encerrar o container:
``` bash
  $ npm run compose:down
```

## Aprendizados

- Realização da dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM;
- Cobertura de testes com Mocha, Chai e Sinon
## Legenda

- `Classificação`: Posição na classificação;
- `Time`: Nome do time;
- `P`: Total de Pontos;
- `J`: Total de Jogos;
- `V`: Total de Vitórias;
- `E`: Total de Empates;
- `D`: Total de Derrotas;
- `GP`: Gols marcados a favor;
- `GC`: Gols sofridos;
- `SG`: Saldo total de gols;
- `%`: Aproveitamento do time.

Feito com ❤️ por Paulo Ewerson 👋🏻 [Get in touch!](https://github.com/PauloEwerson)
