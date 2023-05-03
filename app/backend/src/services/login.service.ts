import { UserConfidentialInterface, LoginInterface } from '../interfaces/all.interfaces';
import User from '../database/models/user.model';

const LoginServices = {
  async login(email: LoginInterface): Promise<UserConfidentialInterface> {
    // const { email } = loginData;
    const tryLogin = await User.findOne({ where: { email } });
    return tryLogin as UserConfidentialInterface;
  },
};

export default LoginServices;
