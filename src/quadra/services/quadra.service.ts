import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quadra } from '../entities/quadra.entity';
import { CreateQuadraDto } from '../../cadastro/create-quadra.dto';
import { UpdateQuadraDto } from '../update-quadra.dto';
import { GoogleMapsService } from '../../googlemaps/services/google-maps.service';



@Injectable()
export class QuadraService {

  constructor(
    @InjectRepository(Quadra)
    private readonly quadraRepository: Repository<Quadra>,
    private readonly googleMapsService: GoogleMapsService
  ) {}

  async createQuadraWithGeocode(address: string) {
    const geocodeData = await this.googleMapsService.getGeocode(address);
  }

  async create(createQuadraDto: CreateQuadraDto): Promise<Quadra> {
    const quadra = this.quadraRepository.create(createQuadraDto);
    return await this.quadraRepository.save(quadra);
  }

  async findAll(): Promise<Quadra[]> {
    try {
      return await this.quadraRepository.find();
    } catch (error) {
      console.error('Error finding all quadras:', error);
      throw new InternalServerErrorException('Error finding all quadras');
    }
  }

  async findOne(id: number): Promise<Quadra> {
    try {
      return await this.quadraRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error finding quadra:', error);
      throw new InternalServerErrorException('Error finding quadra');
    }
  }

  async update(id: number, updateQuadraDto: UpdateQuadraDto): Promise<Quadra> {
    try {
      await this.quadraRepository.update(id, updateQuadraDto);
      return await this.findOne(id);
    } catch (error) {
      console.error('Error updating quadra:', error);
      throw new InternalServerErrorException('Error updating quadra');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.quadraRepository.delete(id);
    } catch (error) {
      console.error('Error deleting quadra:', error);
      throw new InternalServerErrorException('Error deleting quadra');
    }
  }

  async save(quadra: Quadra): Promise<Quadra> {
    return await this.quadraRepository.save(quadra);
  }
}
