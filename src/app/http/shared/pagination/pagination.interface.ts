export interface PaginationInterface<Entity> {
  data: Entity[]
  pageTotal: number
  total: number
}
