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

describe('Verifica as falhas na requisicao GET da rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it.only("Caso não encontre a tabela teams", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
    
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body.message).to.be.equal(serverError);
  });

});