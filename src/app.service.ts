import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Auth! last updated on 05 February 06:28';
  }
}
