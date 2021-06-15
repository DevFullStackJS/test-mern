import { GenericFactory } from '../../../common/constraint/factory/generic.factory';

const schema = {
  societeId: 'company_id',
  partenaireId: 'partner_id',
  uid: 'uid',
  accessToken: 'access_token',
  nom: 'name',
  login: 'login',
};

class boAuthentificationFactory extends GenericFactory<object, object, object> {}

export const odooAuthentificationFactory = new boAuthentificationFactory(schema, schema, schema);
