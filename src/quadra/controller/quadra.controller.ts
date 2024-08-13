import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { QuadraService } from '../services/quadra.service';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Quadra } from '../entities/quadra.entity';
import { CreateQuadraDto } from '../../cadastro/create-quadra.dto';
import { QuadraResponseDto } from '../quadra-response.dto';
import { QrCodeService } from '../../qrcode/services/qrcode.service';



@Controller('quadras')
export class QuadraController {
  constructor(
    private readonly quadraService: QuadraService,
    private readonly usuarioService: UsuarioService,
    private readonly qrCodeService: QrCodeService
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
  async create(@Body() createQuadraDto: CreateQuadraDto): Promise<QuadraResponseDto> {
    const { usuarioId, ...quadraData } = createQuadraDto;
    const usuario = await this.usuarioService.findOne(usuarioId);

    // Verificar se o usuário foi encontrado
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Criação da quadra com o usuário associado
    const quadra = this.quadraService.create({
      ...quadraData,
      usuarioId
    });

    // Gerar QR Code para a quadra
    const qrCodeUrl = await this.qrCodeService.generateQrCode(`Quadra: ${createQuadraDto.nome}`);
    
    // Atualizar a URL do QR Code na quadra
    (await quadra).qrCodeUrl = qrCodeUrl;

    // Salvar a quadra
    const savedQuadra = await this.quadraService.save(await quadra);
    
    // Mapear para o DTO de resposta, omitindo informações sensíveis
    return {
      id: savedQuadra.id,
      nome: savedQuadra.nome,
      descricao: savedQuadra.descricao,
      latitude: savedQuadra.latitude,
      longitude: savedQuadra.longitude,
      ocupada: savedQuadra.ocupada,
      qrCodeUrl: savedQuadra.qrCodeUrl,
    };
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
