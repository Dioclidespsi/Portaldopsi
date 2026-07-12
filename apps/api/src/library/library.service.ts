import { Injectable } from '@nestjs/common';
import { LIBRARY_CATALOG } from './catalog';

@Injectable()
export class LibraryService {
  list() {
    return LIBRARY_CATALOG;
  }
}
