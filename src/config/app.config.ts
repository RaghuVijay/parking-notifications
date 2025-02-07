import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  environment: process.env.NODE_ENV || 'production',
  mailHost: process.env.MAIL_HOST || 'smtp-mail.outlook.com', // Default to Outlook SMTP if not provided
  userName: process.env.MAIL_USERNAME || '', // Ensure MAIL_USERNAME is set in .env
  password: process.env.MAIL_PASSWORD || '', // Ensure MAIL_PASSWORD is set in .env
  portNumber: parseInt(process.env.MAIL_PORT_NUMBER, 10) || 587, // Default to 587 (SMTP)
  userUrl: process.env.AXIOS_PARKING_USER_MANAGEMENT_HOST,
}));
