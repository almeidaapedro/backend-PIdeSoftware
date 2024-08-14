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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_sportmap',
      entities: [Usuario, Quadra],
      synchronize: true,
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
