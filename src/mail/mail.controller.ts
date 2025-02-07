import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { Auth } from 'src/auth/decorator/auth-type.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post('/create')
  @Auth(AuthType.Bearer)
  public async createMail(
    @ActiveUser() user: ActiveUserData,
    @Body() path: string,
  ) {
    return this.mailService.sendUserWelcome(user, path);
  }
}
