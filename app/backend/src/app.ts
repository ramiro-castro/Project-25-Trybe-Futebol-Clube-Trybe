import * as express from 'express';
import TeamRouters from './routers/teams.routers';
import LoginRouters from './routers/login.routers';
import MatchRouters from './routers/matches.routers';
import LeaderboardRouters from './routers/leaderboard.routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.callRoutes();
    // this.app.use('/teams', TeamRouters);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private callRoutes():void {
    this.app.use('/teams', TeamRouters);
    this.app.use('/login', LoginRouters);
    this.app.use('/matches', MatchRouters);
    this.app.use('/leaderboard', LeaderboardRouters);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
