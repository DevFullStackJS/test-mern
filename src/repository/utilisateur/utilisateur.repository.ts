import { EntityRepository, Repository } from 'typeorm';

import { UtilisateurDO } from '../../data/do/utilisateur/utilisateur.do';

@EntityRepository(UtilisateurDO)
export class UtilisateurRepository extends Repository<UtilisateurDO> {}
