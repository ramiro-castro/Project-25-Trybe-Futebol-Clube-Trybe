import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import statusCodes from '../utils/statusCodes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando com sucesso a rota /leaderboard', () => {

  let chaiHttpResponse: Response;

  it('testando se ocorre o retorno da classificação geral com sucesso', async () => {

	chaiHttpResponse = await chai
	.request(app)
	.get('/leaderboard')
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se ocorre o retorno da classificação dos times de casa com sucesso', async () => {

	chaiHttpResponse = await chai
	.request(app)
	.get('/leaderboard/home')
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se ocorre o retorno da classificação dos times de visitantes com sucesso', async () => {

	chaiHttpResponse = await chai
	.request(app)
	.get('/leaderboard/away')
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

});

