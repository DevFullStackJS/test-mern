import { Repository } from 'typeorm';
import { HttpStatus } from '../../data/constants/http-status';
import { GenericFactory } from '../constraint/factory/generic.factory';
import { GenericSA } from '../service/generic.sa';
import { GenericSM } from '../service/generic.sm';

export class GenericController<
  TDo,
  TRequestDto,
  TResponseDto,
  TSa extends GenericSA<
    TDo,
    TRequestDto,
    TResponseDto,
    GenericSM<TDo, string | number, Repository<TDo>>,
    GenericFactory<TDo, TRequestDto, TResponseDto>
  >
> {
  serviceSA: TSa;

  constructor(serviceSA) {
    this.serviceSA = serviceSA;
  }

  /**
   * WS gérant la création d'une entité
   */
  create = async (req, res, next) => {
    const { body } = req;
    console.log({ user: req.user.id, body });
    const owner = req?.user?.id;
    try {
      const created = await this.serviceSA.create(body);

      res.locals.data = created;
      res.locals.statusCode = HttpStatus.CREATED;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la mise à jour d'une entité
   */
  update = async (req, res, next) => {
    const {
      body,
      params: { id },
    } = req;

    try {
      const updated = await this.serviceSA.update(id, body);

      res.locals.data = updated;
      res.locals.statusCode = HttpStatus.OK;

      next();
    } catch (error) {
      next(error);
    }
  };

  partialUpdate = async (req, res, next) => {
    const {
      body,
      params: { id },
    } = req;

    try {
      const updated = await this.serviceSA.partialUpdate(id, body);

      res.locals.data = updated;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la suppression d'une entité
   */
  delete = async (req, res, next) => {
    const {
      params: { id },
    } = req;

    try {
      const response = await this.serviceSA.delete(id);

      res.locals.data = response;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la récupération d'une entité par son id
   */
  findById = async (req, res, next) => {
    const {
      params: { id },
    } = req;

    try {
      const found = await this.serviceSA.findById(id);

      res.locals.data = found;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant la liste de toutes les entités
   */
  findAll = async (req, res, next) => {
    const {
      query: { page, rowPerPage },
    } = req;

    try {
      const dtos = await this.serviceSA.findAll({
        take: rowPerPage,
        skip: (page - 1) * rowPerPage,
      });

      res.locals.data = dtos;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant le document répondant aux critères spécifiés
   */
  findOne = async (req, res, next) => {
    const { query } = req;
    try {
      const found = await this.serviceSA.findOne(query);

      res.locals.data = found;

      next();
    } catch (error) {
      next(error);
    }
  };
}
