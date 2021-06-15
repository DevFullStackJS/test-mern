import { FindConditions, Repository } from 'typeorm';

import { GenericFactory } from '../constraint/factory/generic.factory';
import { GenericSM } from './generic.sm';

export abstract class GenericSA<
  TDo,
  TRequestDto,
  TResponseDto,
  TSm extends GenericSM<TDo, number | string, Repository<TDo>>,
  TFactory extends GenericFactory<TDo, TRequestDto, TResponseDto>
> {
  protected serviceSM: TSm;

  protected factory: TFactory;

  protected name: string;

  constructor(serviceSM: TSm, factory: TFactory, name: string) {
    this.serviceSM = serviceSM;
    this.factory = factory;
    this.name = name;
  }

  async create(dto: TRequestDto | TRequestDto[]): Promise<TResponseDto> {
    console.log('==========>')
    try {
      console.log({ dto });
      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.create(entity);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number | string, dto: TRequestDto): Promise<any> {
    try {
      const entity = this.factory.toDo(dto);
      const result = await this.serviceSM.update(id, entity);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async partialUpdate(id: number | string, partialEntity): Promise<any> {
    try {
      const result = await this.serviceSM.update(id, partialEntity);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  delete(id: number | string): Promise<any> {
    return this.serviceSM.delete(id);
  }

  async findById(id: number | string): Promise<any> {
    try {
      const result = await this.serviceSM.findById(id);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(option: FindConditions<TDo>) {
    try {
      const result = await this.serviceSM.findOne(option);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneNotFail(option: FindConditions<TDo>) {
    try {
      const result = await this.serviceSM.findOneNotFail(option);

      return this.factory.toResponseDto(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(options): Promise<any> {
    try {
      const { take, skip } = options;
      
      const [dos, totalCount] = await this.serviceSM.findAll(
        {
          take,
          skip,
        },
        this.name,
      );
      const items = this.factory.toResponseDto(dos);

      return {
        items,
        totalCount,
        ...(!Number.isNaN(take) && !Number.isNaN(skip)
          ? { hasNext: take * (skip / take + 1) < totalCount }
          : {}),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
