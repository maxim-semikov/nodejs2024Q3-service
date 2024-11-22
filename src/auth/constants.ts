import * as process from 'node:process';

export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  expiresIn: process.env.TOKEN_EXPIRE_TIME || '60s',
};
