/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ['Unexpected error'];

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      status = exception.getStatus();
      message = Array.isArray((res as any)?.message)
        ? (res as any).message
        : [(res as any).message || ''];
    }

    // Manejar errores específicos de PostgreSQL
    const { code, detail } = exception as any;
    if (code === '23505') {
      // Error de violación de constraint unique en PostgreSQL
      status = HttpStatus.BAD_REQUEST;
      // Extraer valor duplicado del mensaje de detalle
      let duplicateValue = 'valor duplicado';
      if (detail) {
        const match = detail.match(/Key \((.+?)\)=\((.+?)\)/);
        if (match) {
          duplicateValue = match[2]; // El valor duplicado
        }
      }
      message = [
        `El valor ingresado '${duplicateValue}' ya se encuentra registrado`,
      ];
    }

    if (code === '23503') {
      // Error de violación de foreign key en PostgreSQL
      status = HttpStatus.BAD_REQUEST;
      message = [
        'El registro referenciado no existe o está siendo utilizado: Foreign Key Violation',
      ];
    }

    if (code === '23502') {
      // Error de campo NOT NULL en PostgreSQL
      status = HttpStatus.BAD_REQUEST;
      message = ['Campo requerido no puede estar vacío: Not Null Violation'];
    }

    if (code === '42P01') {
      // Tabla no existe en PostgreSQL
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ['Error de configuración de base de datos: Table Not Found'];
    }

    console.log(exception);

    this.logger.error(`HTTP ${status} Error: ${JSON.stringify(message)}`);

    response.status(status).json({
      status,
      message,
    });
  }
}
