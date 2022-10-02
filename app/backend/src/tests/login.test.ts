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
  invalidEmail,
  errorMessage,
  invalidPassword,
  emptyEmail,
  emptyPassword,
  fildMessageError,
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

  after(() => {
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

describe('Verifica as falhas na requisicao POST da rota /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Verifica resposta da requisicao caso o email seja invalido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(errorMessage);
  });

  it('Verifica resposta da requisicao caso a senha seja invalida', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidPassword)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(errorMessage);
  });

});

describe('Verifica as falhas na requisicao POST da rota /login', () => {

  let chaiHttpResponse: Response;
  
  before(async () => {
  sinon
  .stub(User, "findOne")
  .resolves(null);
  });
  
  after(() => {
  (User.findOne as sinon.SinonStub).restore();
  })

it("Verifica resposta da requisicao caso o campo 'email' esteja vazio", async () => {
  chaiHttpResponse = await chai
  .request(app)
  .post('/login')
  .send(emptyEmail)
  
  expect(chaiHttpResponse.status).to.be.equal(400)
  expect(chaiHttpResponse.body.message).to.be.equal(fildMessageError)
  });

  it("Verifica resposta da requisicao caso o campo 'password' esteja vazio", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(emptyPassword)
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(fildMessageError);
    });

});