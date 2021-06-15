import { getCustomRepository } from 'typeorm';

import { GenericSM } from '../../../common/service/generic.sm';
import { UtilisateurDO } from '../../../data/do/utilisateur/utilisateur.do';
import { UtilisateurRepository } from '../../../repository/utilisateur/utilisateur.repository';

export class UtilisateurSM extends GenericSM<UtilisateurDO, string, UtilisateurRepository> {
  getAllUtilisateurWithDeviceToken() {
    return this.repository.find({ relations: ['deviceTokens'] });
  }

  getDateInscription(minDate: string, maxDate: string) {
    return this.repository.query(`
    SELECT u."dateInscription" FROM "utilisateur" u 
    WHERE u."dateInscription" BETWEEN '${minDate}' AND '${maxDate}'`);
  }

  getSocketIdByNotifToken(notifToken: string) {
    return this.repository
      .createQueryBuilder('utilisateur')
      .innerJoin('utilisateur.payments', 'payments')
      .where(`payments.notifToken='${notifToken}'`)
      .getOne();
  }

  getSocketIdByTransactionId(transactionId: string) {
    return this.repository
      .createQueryBuilder('utilisateur')
      .innerJoin('utilisateur.payments', 'payments')
      .where(`payments.transactionId='${transactionId}'`)
      .getOne();
  }

  getSocketIdBy;
}

export const utilisateurSM = new UtilisateurSM(getCustomRepository(UtilisateurRepository));
