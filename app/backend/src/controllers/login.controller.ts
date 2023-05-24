import { Request, Response } from 'express';
import createJWT from '../utils/createJWT';
import validationsInputValues from '../middlewares/validationsInputValues';
import LoginServices from '../services/login.service';
import statusCodes from '../utils/statusCodes';

const LoginController = {

  async login(req: Request, res: Response) {
    try {
      const loginData = req.body;
      const checkLoginData = validationsInputValues.validateLoginData(loginData);
      if (checkLoginData.type) {
        return res.status(checkLoginData.type).json({ message: checkLoginData.message });
      }
      const dataUser = await LoginServices.login(loginData.email);
      if (!dataUser) return res.status(401).json({ message: 'Invalid email or password' });
      const checkPassword = validationsInputValues
        .decryptPassword(loginData.password, dataUser.password);

      if (checkPassword) return res.status(401).json({ message: checkPassword });

      const { id, email, role, username } = dataUser;
      const token = await createJWT({ id, email, role, username });

      return res.status(statusCodes.ok).json({ token });
    } catch (error) {
      return res.status(statusCodes.serverError).json({ error });
    }
  },
  async loginRole(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || '';

      const resultCheckToken = await validationsInputValues.checkToken(token);
      if (resultCheckToken.type) {
        return res.status(resultCheckToken.type).json({ message: resultCheckToken.message });
      }

      const email = (resultCheckToken.message as { email?: string }).email || '';

      const { role } = await LoginServices.login(email);

      return res.status(statusCodes.ok).json({ role });
    } catch (error) {
      return res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default LoginController;
