export class PagedList<T> {
    public data: T[];
    public totalCount: number;
    public limit: number;
    public currentPage: number;
    public remainingPages: number;
    public totalPages: number;
  
    public constructor(
      data: T[],
      totalCount: number,
      limit: number,
      currentPage: number
    ) {
      this.data = data;
      this.totalCount = totalCount;
      this.limit = limit;
      this.currentPage = currentPage;
      this.totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;
      this.remainingPages = totalCount
        ? Math.ceil((totalCount - limit * currentPage) / limit)
        : 0;
      this.remainingPages = this.remainingPages < 0 ? 0 : this.remainingPages;
    }
  }
  