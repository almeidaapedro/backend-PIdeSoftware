import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UsuarioModule, JwtModule.register({ secret: 'your-secret-key' })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
