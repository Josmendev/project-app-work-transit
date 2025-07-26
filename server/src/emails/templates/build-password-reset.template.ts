export const buildPasswordResetTemplate = (pin: string): string => {
  return `
    <p>Hola,</p>
    <p>Se ha solicitado una recuperación de contraseña para tu cuenta.</p>
    <p>Tu código de verificación es: <strong>${pin}</strong></p>
    <p>Por favor, introduce este código en la aplicación para restablecer tu contraseña.</p>
    <p>Si no solicitaste esta recuperación, puedes ignorar este correo.</p>
  `;
};
