import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string, senha: string }) {
    const { email, senha } = loginDto;
    
    // Buscar o usuário pelo email
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar o token JWT
    const payload = { sub: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
