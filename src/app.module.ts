import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { QuadraModule } from './quadra/quadra.module';
import { AuthModule } from './auth/auth.module';
import { GoogleMapsModule } from './googlemaps/google-maps.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	    useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    QuadraModule,
    AuthModule,
    GoogleMapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
