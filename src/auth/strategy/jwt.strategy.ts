import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '3f1j$9kd!@9d&1jT^d7#2l@1jT!7%3kZ'
      ,
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuarioService.findById(payload.sub);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
