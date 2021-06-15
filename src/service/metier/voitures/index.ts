import { getCustomRepository } from 'typeorm';

import { GenericSM } from '../../../common/service/generic.sm';
import { VoituresDO } from '../../../data/do/voitures';
import { VoituresRepository } from '../../../repository/voitures';

export class VoituresSM extends GenericSM<VoituresDO, string, VoituresRepository> {
  count() {
    return this.repository.count();
  }
}

export const voituresSM = new VoituresSM(getCustomRepository(VoituresRepository));
