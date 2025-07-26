import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePasswordAndConfirmDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
