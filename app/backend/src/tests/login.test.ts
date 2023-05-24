import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

import statusCodes from '../utils/statusCodes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando com sucesso a rota login', () => {

  let chaiHttpResponse: Response;
  const tokenInvalido = '893819hajhsdjhakd';

  it('testando se com o endpoint /login faz login com sucesso', async () => {
 
	const loginData = {
		"email": "admin@admin.com",
		"password": "secret_admin"
	};

	chaiHttpResponse = await chai
	.request(app)
	.post('/login')
	.send(loginData);
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se o endpoint /login devolve um erro de login se o email estiver errado', async () => {
 
	const loginData = {
		"email": "admin@admin@com",
		"password": "secret_admin"
	};

	chaiHttpResponse = await chai
	.request(app)
	.post('/login')
	.send(loginData);
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.unauthorized);
	expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Invalid email or password'  });
  });

});

