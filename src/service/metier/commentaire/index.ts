import { getCustomRepository } from 'typeorm';

import { GenericSM } from '../../../common/service/generic.sm';
import { CommentaireDO } from '../../../data/do/commentaire';
import { CommentaireRepository } from '../../../repository/commentaire';

export class CommentaireSM extends GenericSM<CommentaireDO, string, CommentaireRepository> {
  count() {
    return this.repository.count();
  }
}

export const commentaireSM = new CommentaireSM(getCustomRepository(CommentaireRepository));
