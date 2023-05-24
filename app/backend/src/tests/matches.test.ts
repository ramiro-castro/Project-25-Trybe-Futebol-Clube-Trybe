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

describe('Testando com sucesso a rota matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
 
  const tokenInvalido = '893819hajhsdjhakd';

  it('testando se o endpoint /matches no back-end  pode retornar todos as partidas corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se o endpoint /matches no back-end  pode finalizar uma partida sem um token', async () => {
	chaiHttpResponse = await chai
	   .request(app).patch('/matches/43/finish');
	expect(chaiHttpResponse.status).to.be.eq(statusCodes.unauthorized);
  });

  it('testando se é possível finalizar uma partida sem um token valido', async () => {

	chaiHttpResponse = await chai
	   .request(app)
	   .patch('/matches/43/finish')
	   .set('authorization', tokenInvalido);
	expect(chaiHttpResponse.status).to.be.eq(statusCodes.unauthorized);
	expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Token must be a valid token' });
  });


  it('testando se é possível finalizar uma partida com sucesso', async () => {
    const token = await createJWT({email: 'admin@admin.com'});
	chaiHttpResponse = await chai
	   .request(app)
	   .patch('/matches/43/finish')
	   .set('authorization', token);
	expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se é possível fazer o update de uma partida com sucesso', async () => {
	const reqBody = {
		homeTeamGoals: 2,
		awayTeamGoals: 1
	};
    const token = await createJWT({email: 'admin@admin.com'});
	chaiHttpResponse = await chai
	   .request(app)
	   .patch('/matches/43')
	   .set('authorization', token)
	   .send(reqBody);
	expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
	expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Updated' });
  });

});

