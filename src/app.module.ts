import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/accesstoken/accesstoken.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { MailController } from './mail/mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import appConfig from './config/app.config';
import environmentValidatation from './config/environment.validatation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig],
      validationSchema: environmentValidatation,
    }),
    MailModule,
    HttpModule,
  ],
  controllers: [AppController, MailController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
