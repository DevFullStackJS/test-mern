import { EntityRepository, Repository } from 'typeorm';

import { CommentaireDO } from '../../data/do/commentaire';

@EntityRepository(CommentaireDO)
export class CommentaireRepository extends Repository<CommentaireDO> {}
