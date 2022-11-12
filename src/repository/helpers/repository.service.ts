/* eslint-disable prettier/prettier */
// TODO RESEARCH ABOUT DEACTIVE SOME RULES OF PRETTIER/ESLINT
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import type {
  ReturnDocumentList,
  ReturnPagination,
  ReturnDocument,
  RepositoryConfig,
  QueryParams,
} from './interfaces';
import { paginate } from './paginate';

@Injectable()
export abstract class RepositoryService<T> {
  private readonly defaultConfig: RepositoryConfig<T>['default'] = {
    page: 1,
    offset: 20,
  };

  constructor(
    private readonly model: Model<T>,
    private readonly config: RepositoryConfig<T> = {},
  ) {
    this.config = this.getConfig();
  }

  private getConfig(): RepositoryConfig<T> {
    return {
      ...this.config,
      default: {
        ...this.defaultConfig,
        ...(this.config.default ?? {}),
      },
    };
  }

  async count(): Promise<number> {
    return this.model.find().count();
  }

  async lookById(id: string, query: QueryParams<T> = {}): ReturnDocument<T> {
    const { select, options } = query;
    return this.model.findById(id, select, options).sort().lean();
  }

  async look(query: QueryParams<T> = {}): ReturnDocumentList<T> {
    const { filter, select, options } = query;
    return this.model.find(filter, select, options).lean();
  }

  async lookOne(query: QueryParams<T> = {}): ReturnDocument<T> {
    const { filter, select, options } = query;
    return this.model.findOne(filter, select, options).lean();
  }

  async pagination(query: QueryParams<T> = {}): ReturnPagination<T> {
    return paginate({ query, model: this.model, config: this.config });
  }

  async create(payload: T, query: QueryParams<T> = {}): ReturnDocument<T> {
    const newDocument = await (new this.model(payload)).save();
    return this.lookById(newDocument._id, query);
  }

  async update(id: string, changes: Partial<T>, query: QueryParams<T> = {}): ReturnDocument<T> {
    await this.model.findByIdAndUpdate(id, changes);
    return this.lookById(id, query);
  }

  async remove(id: string, query: QueryParams<T> = {}): ReturnDocument<T> {
    const removedDocument = await this.lookById(id, query);
    await this.model.findByIdAndRemove(id, query);
    return removedDocument;
  }
}
