import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: ActiveUserData, pathString: string) {
    const rawPath = Object.keys(pathString)[0];
    const pdfFilePath = path.resolve(rawPath);
    console.log('Sending email to:', user.email);

    try {
      if (!fs.existsSync(pdfFilePath)) {
        throw new Error(`PDF file not found at: ${pdfFilePath}`);
      }

      await this.mailerService.sendMail({
        to: user.email,
        from: '"Onboarding Team" <support@parking-management.com>',
        subject: 'Here is your bill',
        template: pathString,
        context: {
          email: user.email,
          loginUrl: 'http://localhost:3003',
        },
        attachments: [
          {
            filename: 'bill.pdf',
            path: pdfFilePath,
            contentType: 'application/pdf',
          },
        ],
      });

      console.log('Email sent successfully');
      return true;
    } catch (error) {
      console.error(
        `Error sending email to ${user.email}:`,
        error.message || error,
      );
      return false;
    }
  }
}
