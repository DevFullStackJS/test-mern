import { HttpStatus } from '../../../data/constants/http-status';
import { inscriptionSA } from '../../../service/applicatif/inscription/inscription.sa';

export class InscriptionController {
  private serviceSA = inscriptionSA;

  signup = async (req, res, next) => {
    try {
      const { body } = req;

      const utilisateur = await this.serviceSA.create(body);
      
      res.locals.data = utilisateur;
      res.locals.statusCode = HttpStatus.CREATED;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const inscriptionController = new InscriptionController();
