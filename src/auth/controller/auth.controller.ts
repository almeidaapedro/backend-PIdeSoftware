// auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


interface LoginDto {
  email: string;
  senha: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.generateToken(user);
  }

  @Post('register')
  async register(@Body() registerDto: LoginDto) {
    const user = await this.authService.registerUser(registerDto.email, registerDto.senha);
    return this.authService.generateToken(user);
  }
}
