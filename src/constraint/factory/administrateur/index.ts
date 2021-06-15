import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { formatDateToLocaleWithHour } from '../../../common/service/date.service';
import { AdministrateurDO } from '../../../data/do/administrateur';
import { AdministrateurRequestDTO } from '../../../data/dto/administrateur/request';
import { AdministrateurResponseDTO } from '../../../data/dto/administrateur/response';

const commonSchema = {
  nom: 'nom',
  prenom: 'prenom',
  email: 'email',
  adresseAdmin: 'adresseAdmin',
  telAdmin: 'telAdmin',
};
const schema = { ...commonSchema };
const responseSchema = {
  ...commonSchema,
  id: 'id',
  dateCreation: { path: 'dateCreation', fn: (value) => formatDateToLocaleWithHour(value) },
};

export class AdministrateurFactory extends GenericFactory<
  AdministrateurDO,
  AdministrateurRequestDTO,
  AdministrateurResponseDTO
> {}

export const administrateurFactory = new AdministrateurFactory(schema, schema, responseSchema);
