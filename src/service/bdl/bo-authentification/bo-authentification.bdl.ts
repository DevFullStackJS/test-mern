import { useGet } from '../../../common/service/axios';
import { configs } from '../../../data/constants/configs';
import { authentification } from '../../../data/constants/urls';

class OdooAuthentificationBDL {
  // eslint-disable-next-line class-methods-use-this
  signIn({ login, password }) {
    return useGet(authentification.baseApi)({
      params: { login, password, db: configs.database },
    });
  }

  async getToken() {
    try {
      const { boUsername: login, boPassword: password } = configs;
      const { access_token: accessToken } = await this.signIn({ login, password });

      return accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const boAuthentificationBDL = new OdooAuthentificationBDL();
