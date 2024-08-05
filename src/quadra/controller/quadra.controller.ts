import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuadraService } from '../services/quadra.service';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Quadra } from '../entities/quadra.entity';


@Controller('quadras')
export class QuadraController {
  constructor(
    private readonly quadraService: QuadraService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  async findAll(): Promise<Quadra[]> {
    return this.quadraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Quadra> {
    return this.quadraService.findOne(id);
  }

  @Post()
  async create(@Body() quadra: Quadra, @Body('usuarioId') usuarioId: number): Promise<Quadra> {
    const usuario = await this.usuarioService.findOne(usuarioId);
    quadra.usuario = usuario;
    return this.quadraService.create(quadra);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() quadra: Quadra): Promise<Quadra> {
    return this.quadraService.update(id, quadra);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.quadraService.remove(id);
  }
}
