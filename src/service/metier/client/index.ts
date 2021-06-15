import { getCustomRepository } from 'typeorm';

import { GenericSM } from '../../../common/service/generic.sm';
import { ClientDO } from '../../../data/do/client';
import { ClientRepository } from '../../../repository/client';

export class ClientSM extends GenericSM<ClientDO, string, ClientRepository> {
  count() {
    return this.repository.count();
  }
}

export const clientSM = new ClientSM(getCustomRepository(ClientRepository));
