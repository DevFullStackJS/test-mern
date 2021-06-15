import { GenericController } from '../../../common/infrastructure/generic.controller';
import { CommentaireDO } from '../../../data/do/commentaire';
import { CommentaireRequestDTO } from '../../../data/dto/commentaire/request';
import { CommentaireResponseDTO } from '../../../data/dto/commentaire/response';
import { commentaireSA, CommentaireSA } from '../../../service/applicatif/commentaire';

class CommentaireController extends GenericController<
  CommentaireDO,
  CommentaireRequestDTO,
  CommentaireResponseDTO,
  CommentaireSA
> {}

export const commentaireController = new CommentaireController(commentaireSA);
