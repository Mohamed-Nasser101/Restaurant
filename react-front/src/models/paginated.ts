export interface Paginated<T> {
  count: number;
  pageNumber: number;
  pageSize: number;
  items: T[];
}