import { GenericSA } from '../../../common/service/generic.sa';
import {
  voituresFactory,
  VoituresFactory,
} from '../../../constraint/factory/voitures';
import { VoituresDO } from '../../../data/do/voitures';
import { VoituresRequestDTO } from '../../../data/dto/voitures/request';
import { VoituresResponseDTO } from '../../../data/dto/voitures/response';
import { voituresSM, VoituresSM } from '../../metier/voitures';

export class VoituresSA extends GenericSA<
  VoituresDO,
  VoituresRequestDTO,
  VoituresResponseDTO,
  VoituresSM,
  VoituresFactory
> {
  async create(dto: VoituresRequestDTO | VoituresRequestDTO[]): Promise<VoituresResponseDTO> {
    try {

      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.create(entity);

      return this.factory.toResponseDto(result);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  setAsSeen(id: string) {
    return this.partialUpdate(id, { vu: true });
  }

  count() {
    return this.serviceSM.count();
  }
}

export const voituresSA = new VoituresSA(voituresSM, voituresFactory, 'Voitures');
