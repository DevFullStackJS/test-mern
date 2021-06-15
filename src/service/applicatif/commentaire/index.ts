import { GenericSA } from '../../../common/service/generic.sa';
import {
  commentaireFactory,
  CommentaireFactory,
} from '../../../constraint/factory/commentaire';
import { CommentaireDO } from '../../../data/do/commentaire';
import { CommentaireRequestDTO } from '../../../data/dto/commentaire/request';
import { CommentaireResponseDTO } from '../../../data/dto/commentaire/response';
import { commentaireSM, CommentaireSM } from '../../metier/commentaire';

export class CommentaireSA extends GenericSA<
  CommentaireDO,
  CommentaireRequestDTO,
  CommentaireResponseDTO,
  CommentaireSM,
  CommentaireFactory
> {
  // async create(dto: CommentaireRequestDTO | CommentaireRequestDTO[]): Promise<CommentaireResponseDTO> {
  //   try {

  //     const entity = this.factory.toDo(dto);
  //     const result = await this.serviceSM.create(entity);

  //     return this.factory.toResponseDto(result);
  //   } catch (error) {
  //     console.log(error);
  //     return Promise.reject(error);
  //   }
  // }

  setAsSeen(id: string) {
    return this.partialUpdate(id, { vu: true });
  }

  count() {
    return this.serviceSM.count();
  }
}

export const commentaireSA = new CommentaireSA(commentaireSM, commentaireFactory, 'Commentaire');
