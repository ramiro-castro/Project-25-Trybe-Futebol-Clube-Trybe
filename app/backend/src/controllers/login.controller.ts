import { Request, Response } from 'express';
import createJWT from '../utils/createJWT';
// import { UserJwt } from '../interfaces/all.interfaces';
// import { decodedInterface, LoginInterface, UserConfidentialInterface } from '../interfaces/all.interfaces';
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
      const token = req.headers.authorization;
      if (!token) {
        return res.status(statusCodes.unauthorized).json({ message: 'Token not found' });
      }

      const decoded = await validationsInputValues.decryptToken(token);
      const { message } = decoded;
      if (decoded.type) {
        return res.status(decoded.type).json({ message });
      }

      const email = (message as { email?: string }).email ?? 'valor_padrao';

      const { role } = await LoginServices.login(email);

      return res.status(statusCodes.ok).json({ role });
    } catch (error) {
      return res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default LoginController;
