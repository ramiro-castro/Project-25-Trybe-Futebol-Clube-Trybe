import { UserConfidentialInterface } from '../interfaces/all.interfaces';
import User from '../database/models/users.model';

const LoginServices = {
  async login(email: string): Promise<UserConfidentialInterface> {
    // const { email } = loginData;
    const tryLogin = await User.findOne({ where: { email } });
    return tryLogin as UserConfidentialInterface;
  },

};

export default LoginServices;
