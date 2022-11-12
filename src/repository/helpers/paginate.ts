import { Model } from 'mongoose';
import {
  QueryParams,
  ReturnPagination,
  Document,
  RepositoryConfig,
} from './interfaces';

type PaginateParams<T> = {
  config: RepositoryConfig<T>;
  model: Model<T>;
  query?: QueryParams<T>;
};

async function paginate<T>(params: PaginateParams<T>): ReturnPagination<T> {
  const { query = {}, config, model } = params;
  const { filter, select, options = {}, pagination } = query;
  const { default: def } = config;
  const {
    page: stringPage = def.page, //
    offset: stringOffset = def.offset,
  } = pagination;

  const page = Number(stringPage);
  const offset = Number(stringOffset);

  const results: Document<T>[] = await model
    .find(filter, select, options)
    .sort(options.sort)
    .skip(page * offset)
    .limit(offset)
    .lean();

  const totalCount = await model
    .find(filter, select, options)
    .sort(options.sort)
    .count();

  const isFirstPage = page < 1;
  const isLastPage = page * offset + offset >= totalCount;

  const totalPages = Math.ceil(totalCount / offset);

  return {
    results,
    totalCount,
    page,
    totalPages,
    prevPage: !isFirstPage ? page - 1 : null,
    nextPage: !isLastPage ? page + 1 : null,
  };
}

export { paginate };
