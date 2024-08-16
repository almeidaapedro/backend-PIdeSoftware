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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
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
