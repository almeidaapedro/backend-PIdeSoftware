import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { QuadraModule } from './quadra/quadra.module';
import { Quadra } from './quadra/entities/quadra.entity';
import { AuthModule } from './auth/auth.module';
import { GoogleMapsModule } from './googlemaps/google-maps.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

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
