import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateTokenAndExpirationTimeDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumberString()
  @IsNotEmpty()
  token: string;
}
