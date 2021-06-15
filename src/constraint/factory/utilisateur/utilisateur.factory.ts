import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { formatDateToLocale } from '../../../common/service/date.service';
import { imageToBase64 } from '../../../common/service/image';
import { UtilisateurDO } from '../../../data/do/utilisateur/utilisateur.do';
import { UtilisateurEditRequestDTO } from '../../../data/dto/utilisateur/utilisateur-edit-request.dto';
import { UtilisateurRequestDTO } from '../../../data/dto/utilisateur/utilisateur-request.dto';
import { UtilisateurResponseDTO } from '../../../data/dto/utilisateur/utilisateur-response.dto';

const commonSchema = {
  id: 'id',
  telephone: 'telephone',
  imageUrl: 'imageUrl',
  email: 'email',
  ville: 'ville',
  adresse: 'adresse',
};
const schema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
  dateInscription: 'dateInscription',
  dateDerniereConnexion: 'dateDerniereConnexion',
};
const requestSchema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
};
const responseSchema = {
  ...commonSchema,
  actif: 'actif',
  nomPrenom: ({ nom, prenom }) => `${nom} ${prenom}`,
  dateInscription: {
    path: 'dateInscription',
    fn: (value) => formatDateToLocale(value),
  },
  dateDerniereConnexion: {
    path: 'dateDerniereConnexion',
    fn: (value) => formatDateToLocale(value),
  },
  cinUrl1: 'cinUrl1',
  cinUrl2: 'cinUrl2',
};
const boResponseSchema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
};
const cinResponseSchema = {
  items: ({ cinUrl1, cinUrl2 }) => (cinUrl1 ? [cinUrl1, cinUrl2] : []),
};
const odooRequestSchema = {
  bo_id: 'id',
  name: 'nom',
  firstname: 'prenom',
  mobile: 'telephone',
  email: 'email',
  street: 'adresse',
  date_of_birth: 'dateNaissance',
  city: 'ville',
  cin_1: { path: 'cinUrl1', fn: (value) => imageToBase64(value) },
  cin_2: { path: 'cinUrl2', fn: (value) => imageToBase64(value) },
  website: () => '',
};

export class UtilisateurFactory extends GenericFactory<
  UtilisateurDO,
  UtilisateurRequestDTO,
  UtilisateurResponseDTO
> {
  toBODTO(utilisateurDO: UtilisateurDO | UtilisateurDO[]) {
    return this.mapper(boResponseSchema, utilisateurDO);
  }

  toOdooRequestDTO(
    utilisateurDO: UtilisateurDO | UtilisateurRequestDTO | UtilisateurEditRequestDTO,
  ) {
    return this.mapper(odooRequestSchema, utilisateurDO);
  }

  toCinResponseDTO(utilisateurDO: UtilisateurDO) {
    return this.mapper(cinResponseSchema, utilisateurDO);
  }
}

export const utilisateurFactory = new UtilisateurFactory(schema, requestSchema, responseSchema);
