import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { formatDateToLocaleWithHour } from '../../../common/service/date.service';
import { CommentaireDO } from '../../../data/do/commentaire';
import { CommentaireRequestDTO } from '../../../data/dto/commentaire/request';
import { CommentaireResponseDTO } from '../../../data/dto/commentaire/response';

const commonSchema = {
  commentaire: 'commentaire',
};
const schema = { ...commonSchema };
const responseSchema = {
  ...commonSchema,
  id: 'id',
  dateCreation: { path: 'dateCreation', fn: (value) => formatDateToLocaleWithHour(value) },
};

export class CommentaireFactory extends GenericFactory<
  CommentaireDO,
  CommentaireRequestDTO,
  CommentaireResponseDTO
> {}

export const commentaireFactory = new CommentaireFactory(schema, schema, responseSchema);
