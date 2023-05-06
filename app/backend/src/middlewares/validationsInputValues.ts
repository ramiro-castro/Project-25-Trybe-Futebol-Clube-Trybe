import * as Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import schemas from './schemas';
import statusCodes from '../utils/statusCodes';

const emailEmptyMessage = '"email" is not allowed to be empty';
const emailInvalidMessage = '"email" must be a valid email';
const passwordEmptyMessage = '"password" is not allowed to be empty';
const passwordMinMessage = '"password" length must be at least 6 characters long';
const invalidMessage = 'Invalid email or password';

const validateLoginData = (loginData: unknown) => {
  const { error } = schemas.emailPassword.validate(loginData);
  if (error) {
    switch (error.message) {
      case emailEmptyMessage:
        return { type: statusCodes.badRequest, message: 'All fields must be filled' };
      case passwordEmptyMessage:
        return { type: statusCodes.badRequest, message: 'All fields must be filled' };
      case emailInvalidMessage:
        return { type: statusCodes.unauthorized, message: invalidMessage };
      case passwordMinMessage:
        return { type: statusCodes.unauthorized, message: invalidMessage };
      default:
        break;
    }
  }
  return { type: null, message: '' };
};

const decryptToken = async (token: string) => {
  const secret = 'jwt_secret';

  const validaToken: unknown = Jwt.verify(token, secret, (err, decoded) => {
    if (err || decoded === undefined) {
      return null;
    }
    return decoded.payload;
  });

  if (validaToken === null) {
    return { type: statusCodes.unauthorized, message: 'Token must be a valid token' };
  }

  return { type: null, message: validaToken };
};

const checkToken = async (token: string) => {
  if (token === '') {
    return { type: statusCodes.unauthorized, message: 'Token not found' };
  }
  const decoded = await decryptToken(token);
  if (decoded.type) {
    return { type: decoded.type, message: decoded.message };
  }
  return { type: null, message: decoded.message };
};

const decryptPassword = (password: string, hash: string) => {
  const checkPassword = bcrypt.compareSync(password, hash);
  if (checkPassword === false) {
    return invalidMessage;
  }
  return null;
};

export default {
  validateLoginData,
  decryptToken,
  decryptPassword,
  checkToken,
};
