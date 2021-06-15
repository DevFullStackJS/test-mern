import { GenericController } from '../../../common/infrastructure/generic.controller';
import { VoituresDO } from '../../../data/do/voitures';
import { VoituresRequestDTO } from '../../../data/dto/voitures/request';
import { VoituresResponseDTO } from '../../../data/dto/voitures/response';
import { voituresSA, VoituresSA } from '../../../service/applicatif/voitures';

class VoituresController extends GenericController<
  VoituresDO,
  VoituresRequestDTO,
  VoituresResponseDTO,
  VoituresSA
> {}

export const voituresController = new VoituresController(voituresSA);
