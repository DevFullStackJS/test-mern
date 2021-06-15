import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { formatDateToLocaleWithHour } from '../../../common/service/date.service';
import { VoituresDO } from '../../../data/do/voitures';
import { VoituresRequestDTO } from '../../../data/dto/voitures/request';
import { VoituresResponseDTO } from '../../../data/dto/voitures/response';

const commonSchema = {
  refVoitures: 'refVoitures',
  nom: 'nom',
  description: 'description',
  imageUrl: 'imageUrl',
};
const schema = { ...commonSchema };
const responseSchema = {
  ...commonSchema,
  id: 'id',
  dateCreation: { path: 'dateCreation', fn: (value) => formatDateToLocaleWithHour(value) },
};

export class VoituresFactory extends GenericFactory<
  VoituresDO,
  VoituresRequestDTO,
  VoituresResponseDTO
> {}

export const voituresFactory = new VoituresFactory(schema, schema, responseSchema);
