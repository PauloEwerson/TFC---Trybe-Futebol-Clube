import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

import {
  teamsMock,
  responseTeams,
  serverError,
  teamById,
} from './mocks/teams.mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica requisicao GET na rota /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMock as Team[]);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it("Retorna todos os times cadastrados", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(responseTeams);
  });

});

describe('Verifica resposta de erro do servidor na requisicao GET da rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it("Caso não encontre a tabela teams", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body.message).to.be.equal(serverError);
  });

});

describe('Verifica requisicao GET da rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([]);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it("Caso não haja times cadastrados", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(0);
  });

});

describe('Verifica requisicao GET da rota /teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(teamById as Team);
  });

  after(() => {
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it("Caso busque um time por id", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/4')
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.own.include(teamById);
  });

});