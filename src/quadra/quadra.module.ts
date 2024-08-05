import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quadra } from "./entities/quadra.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { QuadraService } from "./services/quadra.service";
import { QuadraController } from "./controller/quadra.controller";
import { UsuarioService } from "../usuario/services/usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([Quadra]), UsuarioModule],
    providers: [QuadraService],
    controllers: [QuadraController],
})
export class QuadraModule{}