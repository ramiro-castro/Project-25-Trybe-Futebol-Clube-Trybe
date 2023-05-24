import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import createJWT from '../utils/createJWT';

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import teamExample from '../database/models/teams.model';
import { Response } from 'superagent';

import statusCodes from '../utils/statusCodes';
// import TeamService from '../services/team.service';
// import TeamController from '../controllers/team.controller';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando com sucesso a rota /leaderboard', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  const tokenInvalido = '893819hajhsdjhakd';

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

//   it('testando se o endpoint /login devolve um erro de login se o email estiver errado', async () => {
 
// 	const loginData = {
// 		"email": "admin@admin@com",
// 		"password": "secret_admin"
// 	};

// 	chaiHttpResponse = await chai
// 	.request(app)
// 	.post('/login')
// 	.send(loginData);
//     expect(chaiHttpResponse.status).to.be.eq(statusCodes.unauthorized);
// 	expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Invalid email or password'  });
//   });

});

