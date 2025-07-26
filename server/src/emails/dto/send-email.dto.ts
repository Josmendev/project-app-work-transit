import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  html: string;
}
