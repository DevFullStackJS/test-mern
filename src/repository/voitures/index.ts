import { EntityRepository, Repository } from 'typeorm';

import { VoituresDO } from '../../data/do/voitures';

@EntityRepository(VoituresDO)
export class VoituresRepository extends Repository<VoituresDO> {}
