import { Request, Response } from 'express';
import createJWT from '../utils/createJWT';
// import { UserJwt } from '../interfaces/all.interfaces';
import validationsInputValues from '../middlewares/validationsInputValues';
import LoginServices from '../services/login.service';
import statusCodes from '../utils/statusCodes';

const LoginController = {

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const checkLoginData = validationsInputValues.validateLoginData({ email, password });
      if (checkLoginData.type) {
        return res.status(checkLoginData.type).json({ message: checkLoginData.message });
      }
      const dataUser = await LoginServices.login(email);
      if (!dataUser) return res.status(401).json({ message: 'Invalid email or password' });
      const checkPassword = validationsInputValues.decryptPassword(password, dataUser.password);
      if (checkPassword) {
        return res.status(statusCodes.unauthorized).json({ message: checkPassword });
      }
      //   if (dataUser === undefined) {
      //     res.status(statusCodes.unauthorized).json({ message: 'Username or password invalid' });
      //     return;
      //   }
      //   const { id, username } = dataUser;
      const token = await createJWT({ email, password });
      //   if (!token) return { type: statusCodes.unauthorized, message: 'Token not found' };
      //   const decoded = await validationsInputValues.decryptToken(token);
      //   if (decoded.type) return res.status(decoded.type).json({ message: checkLoginData.message });
      return res.status(statusCodes.ok).json({ token });
    } catch (error) {
      res.status(statusCodes.serverError).json({ error });
    }
  },

};

export default LoginController;
