// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Usuario {
  id: number;
  email: string;
  senha: string;
}

@Injectable()
export class AuthService {
  private users: Usuario[] = []; // Simulação de banco de dados

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    const user = this.users.find(user => user.email === email);
    if (user && await bcrypt.compare(senha, user.senha)) {
      return user;
    }
    return null;
  }

  async registerUser(email: string, senha: string): Promise<Usuario> {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const newUser: Usuario = {
      id: this.users.length + 1,
      email,
      senha: hashedSenha,
    };
    this.users.push(newUser);
    return newUser;
  }

  async generateToken(user: Usuario) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      // Adicione outras informações necessárias
    };
  }
}
