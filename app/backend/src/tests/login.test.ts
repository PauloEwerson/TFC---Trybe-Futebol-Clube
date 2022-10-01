import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

import {
  userBody,
  userMock,
  responseUser,
} from './mocks/login.mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica a requisicao POST na rota /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Verifica resposta da requisicao caso ocorra com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(userBody)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.user).to.deep.equal(responseUser);
  });
});