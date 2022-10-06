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