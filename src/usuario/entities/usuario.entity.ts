import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity({name: "tb_usuarios"})
export class Usuario{

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public nome: string

    @IsEmail()
    @Column({length: 255, nullable:false})
    public email: string
}