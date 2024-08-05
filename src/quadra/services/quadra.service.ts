import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quadra } from '../entities/quadra.entity';


@Injectable()
export class QuadraService {
  constructor(
    @InjectRepository(Quadra)
    private readonly quadraRepository: Repository<Quadra>,
  ) {}

  async findAll(): Promise<Quadra[]> {
    return await this.quadraRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Quadra> {
    const quadra = await this.quadraRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!quadra) {
      throw new NotFoundException(`Quadra com ID ${id} não encontrada`);
    }
    return quadra;
  }

  async create(quadra: Quadra): Promise<Quadra> {
    return await this.quadraRepository.save(quadra);
  }

  async update(id: number, quadra: Quadra): Promise<Quadra> {
    await this.quadraRepository.update(id, quadra);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.quadraRepository.delete(id);
  }
}
