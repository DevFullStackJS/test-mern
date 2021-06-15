import { getCustomRepository } from 'typeorm';

import { GenericSM } from '../../../common/service/generic.sm';
import { AdministrateurDO } from '../../../data/do/administrateur';
import { AdministrateurRepository } from '../../../repository/administrateur';

export class AdministrateurSM extends GenericSM<AdministrateurDO, string, AdministrateurRepository> {
  count() {
    return this.repository.count();
  }
}

export const administrateurSM = new AdministrateurSM(getCustomRepository(AdministrateurRepository));
