import { DeepPartial, FindConditions, FindManyOptions, Repository } from 'typeorm';
import { HttpStatus } from '../../data/constants/http-status';
import { Exception } from '../../service/middleware/exception-handler';

export abstract class GenericSM<TDo, TId, TRepository extends Repository<TDo>> {
  protected repository: TRepository;

  constructor(repository: TRepository) {
    this.repository = repository;
  }

  create(entity: TDo): Promise<TDo> {
    console.log({ entity })
    return this.repository.save(this.repository.create(entity));
  }

  async update(id: TId, partialEntity: DeepPartial<TDo>): Promise<any> {
    try {
      const found = await this.repository.findOneOrFail(id);

      const updated = await this.repository.save(Object.assign(found, partialEntity));

      return updated;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: TId): Promise<any> {
    try {
      const { affected } = await this.repository.delete(id);

      if (affected) {
        return id;
      }

      throw new Exception(HttpStatus.BAD_REQUEST, `id: ${id} introuvable`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findById(id: TId): Promise<any> {
    return this.findOne(id);
  }

  findByIds(ids: TId[], options: FindManyOptions<TDo>) {
    return this.repository.findByIds(ids, options);
  }

  findOne(option: FindConditions<TDo>): Promise<any> {
    return this.repository.findOneOrFail(option);
  }

  findOneNotFail(option: FindConditions<TDo>): Promise<TDo> {
    return this.repository.findOne(option);
  }

  findAll({ skip, take }, name: string): Promise<any> {
    console.log({ name });
    return this.repository.findAndCount({
      skip: skip * Number.parseInt(take),
      take: Number.parseInt(take),
      // relations: [undefined],
    });
  }
}
