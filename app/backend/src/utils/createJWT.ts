// import dotenv from 'dotenv';
import * as Jwt from 'jsonwebtoken';

// dotenv.config();

const jwtConfig: Jwt.SignOptions = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
// if (!jwtSecret) throw new Error('JWT_SECRET not found');

const createJWT = async (payload: object) => Jwt.sign({ payload }, jwtSecret, jwtConfig);

export default createJWT;
