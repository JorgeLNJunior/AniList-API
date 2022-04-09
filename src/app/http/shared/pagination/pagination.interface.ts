export interface PaginationInterface<Entity> {
  results: Entity[];
  pageTotal: number;
  total: number;
}
