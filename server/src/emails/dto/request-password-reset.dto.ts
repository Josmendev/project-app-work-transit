import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class RequestPasswordResetDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @Length(4, 10)
  @IsNotEmpty()
  pin: string;
}
