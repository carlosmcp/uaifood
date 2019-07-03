import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../../config/security';
import * as util from 'util';

export class Security {
  static readonly KEY = crypto.randomBytes(32); // This key should be stored in an environment variable
  static readonly HMAC_KEY = crypto.randomBytes(32); // This key should be stored in an environment variable
  static readonly pbkdf2 = util.promisify(crypto.pbkdf2);
  
  private constructor() { };

  static async toHashPassword(password): Promise<Buffer> {
    return await this.pbkdf2(password, CONFIG.encryption.salt, CONFIG.encryption.iterations, CONFIG.encryption.keylen, CONFIG.encryption.digest);
  }

  static toJwtToken(data, privateKey, time) {
    return jwt.sign(data, privateKey, {  algorithm: CONFIG.jwt.algorithm, expiresIn: time });
  }

  static validJwtToken(token: string) {    
    return jwt.verify(token, CONFIG.jwt.password);
  }
  
  static removeHeaderToken(token) {
   var index = token && token.length && token.indexOf('Bearer');
   return (index !== undefined) ? token.substr(index + 7) : "";
 }

}

export default Security;
