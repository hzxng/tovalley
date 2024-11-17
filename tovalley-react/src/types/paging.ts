export interface Paging {
  pageable: {
    sort: {
      unsorted: boolean
      sorted: boolean
      empty: boolean
    }
    pageSize: number
    pageNumber: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  numberOfElements: number
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  empty: boolean
}
