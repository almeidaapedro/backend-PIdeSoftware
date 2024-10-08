import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quadra } from "./entities/quadra.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { QuadraService } from "./services/quadra.service";
import { QuadraController } from "./controller/quadra.controller";
import { QrCodeModule } from "../qrcode/qrcode.module";
import { GoogleMapsModule } from "../googlemaps/google-maps.module";



@Module({
    imports: [TypeOrmModule.forFeature([Quadra]), UsuarioModule, QrCodeModule, GoogleMapsModule],
    providers: [QuadraService],
    controllers: [QuadraController],
})
export class QuadraModule{}