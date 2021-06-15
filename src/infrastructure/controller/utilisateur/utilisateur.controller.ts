import {
  utilisateurSA,
  UtilisateurSA,
} from '../../../service/applicatif/utilisateur/utilisateur.sa';

export class UtilisateurController {
  private serviceSA: UtilisateurSA;

  constructor(serviceSA: UtilisateurSA) {
    this.serviceSA = serviceSA;
  }

  editUtilisateur = async (req, res, next) => {
    try {
      const { files, body } = req;
      const { image, cin } = files || {};
      const cinUrls = cin && cin.map(({ filename }) => filename);
      res.locals.data = await this.serviceSA.editUtilisateur({
        ...body,
        ...(image?.[0] ? { imageUrl: image[0].filename } : {}),
      });

      next();
    } catch (error) {
      next(error);
    }
  };

  editUtilisateurBO = async (req, res, next) => {
    try {
      const { file, body } = req;

      res.locals.data = await this.serviceSA.partialUpdate(body.id, {
        ...body,
        ...(file ? { imageUrl: file.filename } : {}),
      });

      next();
    } catch (error) {
      next(error);
    }
  };

  changeUtilisateurStatus = async (req, res, next) => {
    try {
      const {
        body: { id, actif },
      } = req;
      await this.serviceSA.changeUtilisateurStatus(id, actif);

      res.locals.data = true;

      next();
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    const {
      query: { page, rowPerPage, direction, sortField, ...queries },
    } = req;

    try {
      res.locals.data = await this.serviceSA.findAll({
        sortField,
        direction,
        queries,
        take: rowPerPage,
        skip: (page - 1) * rowPerPage,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      res.locals.data = await this.serviceSA.findById(id);

      next();
    } catch (error) {
      next(error);
    }
  };

}

export const utilisateurController = new UtilisateurController(utilisateurSA);
