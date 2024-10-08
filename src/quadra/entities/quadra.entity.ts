import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_quadras' })
export class Quadra {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column({ length: 255, nullable: false })
  public nome: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  public descricao: string;

  @Column({ type: 'float', nullable: false })
  public latitude: number;

  @Column({ type: 'float', nullable: false })
  public longitude: number;

  @Column({ default: false })
  public ocupada: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.quadras)
  usuario: Usuario;
  
  @Column({ nullable: true })
  qrCodeUrl?: string;
}
