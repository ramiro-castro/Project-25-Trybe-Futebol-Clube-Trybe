import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as http from 'http';
import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o método start', () => {
  it('Deve iniciar o servidor na porta correta', async () => {
    const PORT = 3009;// a porta tem que ser diferente da que esta em uso
    const app = new App();
    const server = http.createServer(app.app);

	server.listen(PORT);

    const response = await chai.request(`http://localhost:${PORT}`).get('/');

    expect(response.status).to.equal(200);

    server.close();
  });
});
