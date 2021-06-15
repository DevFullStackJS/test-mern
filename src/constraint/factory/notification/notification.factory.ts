import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { NotificationDO } from '../../../data/do/notification/notification.do';
import { NotificationRequestDTO } from '../../../data/dto/notification/notification-request.dto';
import { NotificationResponseDTO } from '../../../data/dto/notification/notification-response.dto';

const schema = {
  titre: 'titre',
  message: 'message',
};
const responseSchema = {
  ...schema,
  id: 'id',
  vu: 'vu',
  dateCreation: 'dateCreation',
};
const doSchema = {
  ...schema,
  utilisateur: 'utilisateur',
};

export class NotificationFactory extends GenericFactory<
  NotificationDO,
  NotificationRequestDTO,
  NotificationResponseDTO
> {}

export const notificationFactory = new NotificationFactory(doSchema, schema, responseSchema);
