import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quadra } from "./entities/quadra.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { QuadraService } from "./services/quadra.service";
import { QuadraController } from "./controller/quadra.controller";
import { QrCodeModule } from "../qrcode/qrcode.module";



@Module({
    imports: [TypeOrmModule.forFeature([Quadra]), UsuarioModule, QrCodeModule],
    providers: [QuadraService],
    controllers: [QuadraController],
})
export class QuadraModule{}