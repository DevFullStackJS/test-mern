import { v4 as uuidV4 } from 'uuid';

import { inscriptionFactory } from '../../../constraint/factory/inscription/inscription.factory';
import { InscriptionRequestDTO } from '../../../data/dto/inscription/inscription-request.dto';
import { utilisateurSM } from '../../metier/utilisateur/utilisateur.sm';

export class InscriptionSA {
  private factory = inscriptionFactory;

  async create(dto: InscriptionRequestDTO) {
    try {
      const id = uuidV4();
      const utilisateurDO = this.factory.toDo({ ...dto, id });

      const saved = await utilisateurSM.create(utilisateurDO);

      console.log({ saved });

      const utilisateur = this.factory.toResponseDto(saved);

      return {
        utilisateur,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const inscriptionSA = new InscriptionSA();
