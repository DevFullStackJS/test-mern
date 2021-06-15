import { GenericSA } from '../../../common/service/generic.sa';
import {
  administrateurFactory,
  AdministrateurFactory,
} from '../../../constraint/factory/administrateur';
import { AdministrateurDO } from '../../../data/do/administrateur';
import { AdministrateurRequestDTO } from '../../../data/dto/administrateur/request';
import { AdministrateurResponseDTO } from '../../../data/dto/administrateur/response';
import { administrateurSM, AdministrateurSM } from '../../metier/administrateur';

export class AdministrateurSA extends GenericSA<
  AdministrateurDO,
  AdministrateurRequestDTO,
  AdministrateurResponseDTO,
  AdministrateurSM,
  AdministrateurFactory
> {
  async create(dto: AdministrateurRequestDTO | AdministrateurRequestDTO[]): Promise<AdministrateurResponseDTO> {
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

export const administrateurSA = new AdministrateurSA(administrateurSM, administrateurFactory, 'Administrateur');
