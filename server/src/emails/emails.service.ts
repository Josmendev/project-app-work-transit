import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/config/envs.config';
import { SendEmailDto } from './dto/send-email.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { buildPasswordResetTemplate } from './templates/build-password-reset.template';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.email.host,
      port: envs.email.port,
      secure: false,
      auth: {
        user: envs.email.user,
        pass: envs.email.pass,
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    try {
      const { to, subject, html } = sendEmailDto;
      await this.transporter.sendMail({
        from: `"Work Transit" <josmendev@gmail.com>`,
        to,
        subject,
        html,
      });
      return { message: 'Correo electrónico enviado exitosamente' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al enviar correo';
      console.log(errorMessage);
      throw new InternalServerErrorException(errorMessage);
    }
  }

  async requestPasswordResetUser(
    requestPasswordResetDto: RequestPasswordResetDto,
  ): Promise<any> {
    const { email, pin } = requestPasswordResetDto;
    const subject = 'Recuperación de Contraseña';
    const html = buildPasswordResetTemplate(pin);
    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}
