import { Module } from '@nestjs/common';
import { QrCodeService } from './services/qrcode.service';

@Module({
  providers: [QrCodeService],
  exports: [QrCodeService], 
})
export class QrCodeModule {}
