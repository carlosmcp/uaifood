import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import CONFIG from 'src/../config/security';
import * as util from 'util';

export class Security {
  static readonly ALGORITHM = 'AES-256-CBC'; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
  static readonly HMAC_ALGORITHM = 'SHA256';
  static readonly KEY = crypto.randomBytes(32); // This key should be stored in an environment variable
  static readonly HMAC_KEY = crypto.randomBytes(32); // This key should be stored in an environment variable
  static readonly pbkdf2 = util.promisify(crypto.pbkdf2);

  private constructor() { };

  static async toHashPassword(password): Promise<Buffer> {
    return await this.pbkdf2(password, CONFIG.encryption.salt, CONFIG.encryption.iterations, CONFIG.encryption.keylen, CONFIG.encryption.digest);
  }

  static toJwtToken(data, privateKey, time) {
    return jwt.sign(data, privateKey, { algorithm: CONFIG.jwt.algorithm, expiresIn: time });
  }

}

export default Security;
