/* eslint-disable class-methods-use-this */
import { useGet, usePost, usePut } from '../../../common/service/axios';
import { contentType } from '../../../data/constants/content-type';
import { utilisateur } from '../../../data/constants/urls';
import { boAuthentificationBDL } from '../bo-authentification/bo-authentification.bdl';

export class UtilisateurBDL {
  async create(dto) {
    try {
      const accessToken = await boAuthentificationBDL.getToken();

      return usePost(utilisateur.baseApi)({
        customHeader: { 'Content-Type': contentType.json, access_token: accessToken },
        body: dto,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(partialDTO) {
    try {
      const accessToken = await boAuthentificationBDL.getToken();

      return usePut(utilisateur.baseApi)({
        customHeader: { 'Content-Type': contentType.json, access_token: accessToken },
        body: partialDTO,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAll(query) {
    try {
      const accessToken = await boAuthentificationBDL.getToken();

      return useGet(utilisateur.baseApi)({
        customHeader: { 'Content-Type': contentType.json, access_token: accessToken },
        body: query,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const utilisateurBDL = new UtilisateurBDL();
