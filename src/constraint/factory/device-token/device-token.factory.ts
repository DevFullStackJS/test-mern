import { GenericFactory } from '../../../common/constraint/factory/generic.factory';
import { DeviceTokenDO } from '../../../data/do/device-token/device-token.do';

const schema = {
  token: 'token',
};
const doSchema = {
  ...schema,
  utilisateur: 'utilisateur',
};

export class DeviceTokenFactory extends GenericFactory<DeviceTokenDO, object, object> {}

export const deviceTokenFactory = new DeviceTokenFactory(doSchema, schema, schema);
