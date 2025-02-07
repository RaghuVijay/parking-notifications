import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './providers/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        console.log('SMTP Config:', {
          host: config.get<string>('mail.mailHost'),
          port: config.get<number>('mail.portNumber'),
          user: config.get<string>('mail.userName'),
        });
        return {
          transport: {
            host: config.get<string>('mail.mailHost'),
            secure: false, // Use TLS (587), secure: true if using SSL (465)
            port: config.get<number>('mail.portNumber'),
            auth: {
              user: config.get('mail.userName'),
              pass: config.get('mail.password'), // Make sure app password is used if required
            },
            logger: true,
            debug: true,
          },
          defaults: {
            from: '"No Reply" <no-reply@example.com>',
          },
        };
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
