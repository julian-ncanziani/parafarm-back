import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService){};

  getPort(){
    return this.configService.get<string>('PORT');
  }

  getHello(): string {
    return 'Test server OK on port:' + this.configService.get<string>('PORT');
  }
}