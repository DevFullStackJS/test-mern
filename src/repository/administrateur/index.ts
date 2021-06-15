import { EntityRepository, Repository } from 'typeorm';

import { AdministrateurDO } from '../../data/do/administrateur';

@EntityRepository(AdministrateurDO)
export class AdministrateurRepository extends Repository<AdministrateurDO> {}
