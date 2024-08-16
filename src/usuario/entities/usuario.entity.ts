import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quadra } from "../../quadra/entities/quadra.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_usuarios"})
export class Usuario{

    @PrimaryGeneratedColumn()
    public id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public nome: string

    @IsEmail()
    @Column({length: 255, nullable:false})
    @ApiProperty({example: "email@email.com.br"}) 
    public email: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public senha: string
    
    @OneToMany(() => Quadra, (quadra) => quadra.usuario)
    public quadras: Quadra[];
}