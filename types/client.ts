export interface HTTPResponse<T> {
    status: number
    data?: T
    error?: string
  }
export interface JikanData<T> {
    data: T
  } 
export interface JikanPaginatedData<T> extends JikanData<T> {
    pagination: {
      current_page: number,
      last_visible_page: number,
      has_next_page: boolean,
      items: {count: number, per_page: number, total: number}
    }
  }