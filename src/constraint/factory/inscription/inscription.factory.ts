import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { formatDateToLocaleWithHour } from '../../../common/service/date.service';
import { UtilisateurDO } from '../../../data/do/utilisateur/utilisateur.do';
import { InscriptionRequestDTO } from '../../../data/dto/inscription/inscription-request.dto';
import { InscriptionResponseDTO } from '../../../data/dto/inscription/inscription-response.dto';

const commonSchema = {
  id: 'id',
  nom: 'nom',
  prenom: 'prenom',
  telephone: 'telephone',
  imageUrl: 'imageUrl',
  email: 'email',
  ville: 'ville',
  adresse: 'adresse',
  dateNaissance: 'dateNaissance',
  password: 'password',
};
const schema = { ...commonSchema };
const responseSchema = { id: 'id', ...commonSchema };

export class InscriptionFactory extends GenericFactory<
  UtilisateurDO,
  InscriptionRequestDTO,
  InscriptionResponseDTO
> {}

export const inscriptionFactory = new InscriptionFactory(schema, schema, responseSchema);
