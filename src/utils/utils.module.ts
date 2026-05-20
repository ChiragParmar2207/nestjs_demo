import { Global, Module } from '@nestjs/common';

import { EncryptService } from './encrypt.service';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [EncryptService, JwtService],
  exports: [EncryptService, JwtService],
})
export class UtilsModule {}
