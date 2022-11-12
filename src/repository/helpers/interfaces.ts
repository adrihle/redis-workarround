import {
  FilterQuery,
  PopulateOptions as DefaultPopulateOptions,
  ProjectionType,
  QueryOptions,
  SortOrder,
} from 'mongoose';
import { MongoSchema } from '.';

type Document<T> = T & MongoSchema;

type ReturnDocument<T> = Promise<Document<T> | undefined>;
type ReturnDocumentList<T> = Promise<Document<T>[]>;

type SelectOptions<T> = ProjectionType<Document<T>>;
type FilterOptions<T> = FilterQuery<Document<T>>;
type PopulateOptions<T> = DefaultPopulateOptions & {
  path: keyof T;
  select?: SelectOptions<T>;
  options?: QueryOptions<Document<T>>;
  populate?: (keyof T | PopulateOptions<T>) | (keyof T | PopulateOptions<T>)[];
};
type SortOptions<T> = Record<keyof T, SortOrder> | SortOrder;

type Options<T> = QueryOptions<Document<T>> & {
  populate?: PopulateOptions<T>['populate'];
  sort?: SortOptions<T>;
};
type PaginationParams = {
  page?: number;
  offset?: number;
};

type QueryParams<T> = {
  filter?: FilterOptions<T>;
  select?: SelectOptions<T>;
  options?: Options<T>;
  pagination?: PaginationParams;
};

type ReturnPagination<T> = Promise<{
  results: Document<T>[];
  totalCount: number;
  page: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}>;

type RepositoryConfig<T> = {
  default?: {
    page?: number;
    offset?: number;
    sort?: SortOptions<T>;
  };
};

export type {
  Document,
  ReturnDocument,
  ReturnDocumentList,
  ReturnPagination,
  QueryParams,
  RepositoryConfig,
};
