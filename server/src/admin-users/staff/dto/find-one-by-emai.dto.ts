import { IsEmail, IsString } from 'class-validator';

export class FindOneByEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}

export interface FindOneByEmailResponseDto {
  staffId: number;
  identityDocumentNumber: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  telephone: string;
  email: string;
  isActive: boolean;
}
