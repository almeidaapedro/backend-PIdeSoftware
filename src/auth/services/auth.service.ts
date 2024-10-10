import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { LoginDto } from '../../login/login.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  generateToken(user: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}
  
  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioService.findByEmail(loginDto.email);
    if (usuario && await bcrypt.compare(loginDto.senha, usuario.senha)) {
      const payload = { email: usuario.email, sub: usuario.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return { message: 'Invalid credentials' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (usuario && await bcrypt.compare(password, usuario.senha)) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async cadastrarUsuario(userData: any) {
    try {
      const response = await axios.post('https://backend-pidesoftware.onrender.com/usuarios/cadastrar', userData);
      return response.data;
    } catch (error) {
      // Lidar com erro aqui
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }
}
