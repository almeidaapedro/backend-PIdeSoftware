import { PartialType } from '@nestjs/swagger';
import { CreateQuadraDto } from '../cadastro/create-quadra.dto';


export class UpdateQuadraDto extends PartialType(CreateQuadraDto) {}

