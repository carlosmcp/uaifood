import ResultPaginated from './result.paginated';
import { count } from 'rxjs/operators';

export class Paginator<T> extends ResultPaginated<T> {
    page: number = 0;
    limit: number = 0;
    
    constructor(resultPaginated: ResultPaginated<T>, page: number, limit: number) {
        super(resultPaginated.data, resultPaginated.count);
        this.page = page;
        this.limit = limit;
    }
}

export default Paginator;