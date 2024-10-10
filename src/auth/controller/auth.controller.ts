import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../../login/login.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { CriarUsuarioDto } from '../../cadastro/create-usuario.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
    async login(@Body() usuarioLogin: { email: string; senha: string }) {
        return this.authService.login(usuarioLogin);
    }

  @Post('register')
  async register(@Body() criarUsuarioDto: CriarUsuarioDto) {
    const hashedPassword = await bcrypt.hash(criarUsuarioDto.senha, 10);
    const usuario = { ...criarUsuarioDto, senha: hashedPassword };
    return this.usuarioService.create(usuario);
  }
}
