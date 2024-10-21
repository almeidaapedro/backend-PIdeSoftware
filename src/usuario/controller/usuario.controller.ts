import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from '../../cadastro/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Usuario> {
        return this.usuarioService.findOne(id);
    }

    @Post('criar')
    async create(@Body() createUsuarioDto: CriarUsuarioDto) {
        const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
        const usuario = { ...createUsuarioDto, senha: hashedPassword };
        return this.usuarioService.create(usuario);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(id, usuario);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usuarioService.remove(id);
    }
}
