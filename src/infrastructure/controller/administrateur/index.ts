import { GenericController } from '../../../common/infrastructure/generic.controller';
import { AdministrateurDO } from '../../../data/do/administrateur';
import { AdministrateurRequestDTO } from '../../../data/dto/administrateur/request';
import { AdministrateurResponseDTO } from '../../../data/dto/administrateur/response';
import { administrateurSA, AdministrateurSA } from '../../../service/applicatif/administrateur';

class AdministrateurController extends GenericController<
  AdministrateurDO,
  AdministrateurRequestDTO,
  AdministrateurResponseDTO,
  AdministrateurSA
> {}

export const administrateurController = new AdministrateurController(administrateurSA);
