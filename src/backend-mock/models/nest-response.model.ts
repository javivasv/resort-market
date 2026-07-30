export interface NestResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}
