import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import teamExample from '../database/models/teams.model';
import { Response } from 'superagent';

import statusCodes from '../utils/statusCodes';
// import TeamService from '../services/team.service';
// import TeamController from '../controllers/team.controller';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando com sucesso a rota teams', () => {

  let chaiHttpResponse: Response;

  it('testando se o endpoint /teams no back-end  pode retornar todos os times corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });

  it('testando se o endpoint /teams no back-end  pode retornar um time corretamente', async () => {
	chaiHttpResponse = await chai
	   .request(app).get('/teams/4');
	expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
  });
});


  describe('Testando catch erro de servidor na rota teams/:id', () => {

	let chaiHttpResponse: Response;
     
	  it('testando se o endpoint /teams/:id no back-end pode lidar com erros corretamente', async () => {
		chaiHttpResponse = await chai.request(app).get('/teams/4');
		expect(chaiHttpResponse.status).to.be.eq(statusCodes.serverError);
	  });
	  // feito com auxilio de: https://trybecourse.slack.com/archives/C027T2VU8U8/p1651434585504449
  });

