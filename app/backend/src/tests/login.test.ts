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
  validToken,
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

  it('Caso ocorra com sucesso', async () => {
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

  it('Caso o email seja invalido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(errorMessage);
  });

  it('Caso a senha seja invalida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidPassword)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(errorMessage);
  });

  it("Caso o campo 'email' esteja vazio", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(emptyEmail)

    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body.message).to.be.equal(fildMessageError)
  });

  it("Caso o campo 'password' esteja vazio", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(emptyPassword)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(fildMessageError);
  });

});

describe('Verifica requisicao GET na rota login/validate', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it("Caso token seja válido", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', validToken)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.own.include({ role: 'admin' });
  });

});

describe('Verifica as falhas na requisicao GET da rota /login/validate', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it("Caso o usuario nao exista", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', validToken)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('User does not exist');
  });

  it("Caso o token seja invalido", async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'Expired_or_invalid_token')
   
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('No access authorization');
  });

  it("Caso o token não exista", async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });
});