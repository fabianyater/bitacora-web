export interface Pagination<T> {
  content: T;
  totalElements: number;
  size: number;
  pageNumber: number;
  totalPages: number;
}